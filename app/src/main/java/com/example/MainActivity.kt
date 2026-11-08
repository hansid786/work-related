package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.CheckCircle
import androidx.compose.material.icons.outlined.Close
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.data.JewelryRepository
import com.example.ui.components.AtelierSearchBar
import com.example.ui.components.AtelierTopAppBar
import com.example.ui.components.Jewelry3DViewer
import com.example.ui.dialogs.CartDrawerDialog
import com.example.ui.dialogs.CheckoutDialog
import com.example.ui.dialogs.ConsultationBookingDialog
import com.example.ui.dialogs.InteractiveRingSizerDialog
import com.example.ui.dialogs.OrderConfirmationDialog
import com.example.ui.screens.FavoritesScreen
import com.example.ui.screens.HomeScreen
import com.example.ui.screens.ProductDetailScreen
import com.example.ui.theme.AtelierGoldAccent
import com.example.ui.theme.AtelierOnTertiary
import com.example.ui.theme.AtelierSecondaryGold
import com.example.ui.theme.AtelierSurface
import com.example.ui.theme.AtelierTertiary
import com.example.ui.theme.AtelierTheme
import com.example.ui.theme.MontserratFontFamily
import com.example.ui.viewmodel.AtelierScreen
import com.example.ui.viewmodel.AtelierViewModel
import kotlinx.coroutines.delay

class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
    setContent {
      AtelierTheme {
        AtelierApp()
      }
    }
  }
}

@Composable
fun AtelierApp(viewModel: AtelierViewModel = viewModel()) {
  val uiState by viewModel.uiState.collectAsStateWithLifecycle()
  val catalog by viewModel.filteredCatalog.collectAsStateWithLifecycle()
  val favoriteIds by viewModel.favoriteIds.collectAsStateWithLifecycle()
  val favoriteItems by viewModel.favoriteItems.collectAsStateWithLifecycle()
  val cartItems by viewModel.cartItems.collectAsStateWithLifecycle()

  // Handle system back navigation smoothly
  BackHandler(
    enabled = uiState.isCartOpen ||
        uiState.isSearchActive ||
        uiState.currentScreen !is AtelierScreen.Home
  ) {
    when {
      uiState.isCartOpen -> viewModel.openCart(false)
      uiState.isSearchActive -> viewModel.toggleSearch(false)
      uiState.currentScreen is AtelierScreen.Detail -> viewModel.navigateToHome()
      uiState.currentScreen is AtelierScreen.Favorites -> viewModel.navigateToHome()
      uiState.currentScreen is AtelierScreen.Studio3D -> viewModel.navigateToHome()
    }
  }

  // Auto-dismiss transient notification
  LaunchedEffect(uiState.notificationMessage) {
    if (uiState.notificationMessage != null) {
      delay(3800)
      viewModel.clearNotification()
    }
  }

  val totalCartQty = cartItems.sumOf { it.quantity }
  val canNavigateBack = uiState.currentScreen !is AtelierScreen.Home
  val isStudio3D = uiState.currentScreen is AtelierScreen.Studio3D

  Scaffold(
    contentWindowInsets = WindowInsets.systemBars,
    topBar = {
      if (!isStudio3D) {
        if (uiState.isSearchActive) {
          AtelierSearchBar(
            query = uiState.searchQuery,
            onQueryChange = { viewModel.updateSearchQuery(it) },
            onClose = { viewModel.toggleSearch(false) }
          )
        } else {
          AtelierTopAppBar(
            canNavigateBack = canNavigateBack,
            onBackClick = { viewModel.navigateToHome() },
            onSearchClick = { viewModel.toggleSearch(true) },
            onFavoritesClick = { viewModel.navigateToFavorites() },
            onCartClick = { viewModel.openCart(true) },
            favoriteCount = favoriteIds.size,
            cartCount = totalCartQty
          )
        }
      }
    },
    modifier = Modifier.fillMaxSize()
  ) { innerPadding ->
    Box(
      modifier = Modifier
        .fillMaxSize()
        .padding(innerPadding)
    ) {
      // Screen Routing
      when (val screen = uiState.currentScreen) {
        is AtelierScreen.Home -> {
          HomeScreen(
            catalog = catalog,
            favoriteIds = favoriteIds,
            selectedCategory = uiState.selectedCategory,
            onSelectCategory = { viewModel.selectCategory(it) },
            onItemClick = { viewModel.navigateToDetail(it) },
            onToggleFavorite = { viewModel.toggleFavorite(it) },
            onOpenConsultation = { viewModel.openConsultation(true) },
            onOpenRingGuide = { viewModel.openRingGuide(true) },
            onOpenStudio3D = { viewModel.navigateToStudio3D() }
          )
        }

        is AtelierScreen.Detail -> {
          val selectedItem = JewelryRepository.getItemById(screen.itemId)
          if (selectedItem != null) {
            ProductDetailScreen(
              item = selectedItem,
              isFavorite = favoriteIds.contains(selectedItem.id),
              onBackClick = { viewModel.navigateToHome() },
              onToggleFavorite = { viewModel.toggleFavorite(selectedItem.id) },
              onAddToCart = { item, metal, size, engraving ->
                viewModel.addToCart(item, metal, size, engraving)
              },
              onOpenConsultation = { viewModel.openConsultation(true) },
              onOpenRingGuide = { viewModel.openRingGuide(true) },
              onOpenStudio3D = { metalId -> viewModel.navigateToStudio3D(metalId = metalId) }
            )
          } else {
            HomeScreen(
              catalog = catalog,
              favoriteIds = favoriteIds,
              selectedCategory = uiState.selectedCategory,
              onSelectCategory = { viewModel.selectCategory(it) },
              onItemClick = { viewModel.navigateToDetail(it) },
              onToggleFavorite = { viewModel.toggleFavorite(it) },
              onOpenConsultation = { viewModel.openConsultation(true) },
              onOpenRingGuide = { viewModel.openRingGuide(true) },
              onOpenStudio3D = { viewModel.navigateToStudio3D() }
            )
          }
        }

        is AtelierScreen.Favorites -> {
          FavoritesScreen(
            favoriteItems = favoriteItems,
            onBackClick = { viewModel.navigateToHome() },
            onItemClick = { viewModel.navigateToDetail(it) },
            onToggleFavorite = { viewModel.toggleFavorite(it) },
            onOpenConsultation = { viewModel.openConsultation(true) }
          )
        }

        is AtelierScreen.Studio3D -> {
          Jewelry3DViewer(
            selectedMetalId = screen.initialMetalId,
            selectedStone = screen.initialStone,
            onClose = { viewModel.navigateToHome() }
          )
        }
      }

      // Elegant Luxury Notification Toast Banner
      AnimatedVisibility(
        visible = uiState.notificationMessage != null,
        enter = slideInVertically(initialOffsetY = { -it }) + fadeIn(),
        exit = slideOutVertically(targetOffsetY = { -it }) + fadeOut(),
        modifier = Modifier
          .align(Alignment.TopCenter)
          .padding(top = 16.dp, start = 20.dp, end = 20.dp)
      ) {
        uiState.notificationMessage?.let { msg ->
          Surface(
            shape = RoundedCornerShape(2.dp),
            color = AtelierTertiary,
            shadowElevation = 8.dp,
            modifier = Modifier.clickable { viewModel.clearNotification() }
          ) {
            Row(
              modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp),
              verticalAlignment = Alignment.CenterVertically
            ) {
              Icon(
                imageVector = Icons.Outlined.CheckCircle,
                contentDescription = null,
                tint = AtelierSecondaryGold,
                modifier = Modifier.padding(end = 10.dp)
              )
              Text(
                text = msg,
                fontFamily = MontserratFontFamily,
                fontWeight = FontWeight.Medium,
                fontSize = 12.sp,
                color = AtelierOnTertiary,
                modifier = Modifier.weight(1f)
              )
              IconButton(
                onClick = { viewModel.clearNotification() },
                modifier = Modifier.padding(start = 6.dp)
              ) {
                Icon(
                  imageVector = Icons.Outlined.Close,
                  contentDescription = "Dismiss",
                  tint = AtelierSurface
                )
              }
            }
          }
        }
      }
    }
  }

  // Modals & Drawers
  CartDrawerDialog(
    isOpen = uiState.isCartOpen,
    cartItems = cartItems,
    onClose = { viewModel.openCart(false) },
    onUpdateQty = { cartId, qty -> viewModel.updateCartQuantity(cartId, qty) },
    onRemoveItem = { cartId -> viewModel.removeCartItem(cartId) },
    onProceedToCheckout = { viewModel.openCheckout(true) }
  )

  CheckoutDialog(
    isOpen = uiState.isCheckoutOpen,
    totalAmount = cartItems.sumOf { it.totalPrice },
    onDismiss = { viewModel.openCheckout(false) },
    onConfirmOrder = { name, address ->
      viewModel.completeCheckout(name, address)
    }
  )

  OrderConfirmationDialog(
    orderNumber = uiState.lastOrderNumber,
    onDismiss = { viewModel.dismissOrderConfirmation() }
  )

  ConsultationBookingDialog(
    isOpen = uiState.isConsultationOpen,
    onDismiss = { viewModel.openConsultation(false) },
    onBook = { name, email, phone, salon, date, time, notes ->
      viewModel.bookConsultation(name, email, phone, salon, date, time, notes)
    }
  )

  InteractiveRingSizerDialog(
    isOpen = uiState.isRingGuideOpen,
    onDismiss = { viewModel.openRingGuide(false) }
  )
}
