package com.example.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.JewelryRepository
import com.example.model.CartItem
import com.example.model.ConsultationBooking
import com.example.model.JewelryCategory
import com.example.model.JewelryItem
import com.example.model.MetalOption
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.util.UUID

sealed interface AtelierScreen {
  object Home : AtelierScreen
  data class Detail(val itemId: String) : AtelierScreen
  object Favorites : AtelierScreen
  data class Studio3D(val initialMetalId: String = "18k_yellow", val initialStone: String = "diamond") : AtelierScreen
}

data class AtelierUiState(
  val currentScreen: AtelierScreen = AtelierScreen.Home,
  val selectedCategory: JewelryCategory = JewelryCategory.ALL,
  val searchQuery: String = "",
  val isSearchActive: Boolean = false,
  val isCartOpen: Boolean = false,
  val isConsultationOpen: Boolean = false,
  val isRingGuideOpen: Boolean = false,
  val isCheckoutOpen: Boolean = false,
  val lastOrderNumber: String? = null,
  val notificationMessage: String? = null
)

class AtelierViewModel : ViewModel() {

  private val _uiState = MutableStateFlow(AtelierUiState())
  val uiState: StateFlow<AtelierUiState> = _uiState.asStateFlow()

  val favoriteIds: StateFlow<Set<String>> = JewelryRepository.favoriteIds
  val cartItems: StateFlow<List<CartItem>> = JewelryRepository.cartItems
  val consultations: StateFlow<List<ConsultationBooking>> = JewelryRepository.consultations

  val filteredCatalog: StateFlow<List<JewelryItem>> = combine(
    _uiState,
    _uiState
  ) { state, _ ->
    JewelryRepository.sampleCatalog.filter { item ->
      val matchesCategory = (state.selectedCategory == JewelryCategory.ALL || item.category == state.selectedCategory)
      val matchesQuery = if (state.searchQuery.isBlank()) true else {
        item.title.contains(state.searchQuery, ignoreCase = true) ||
            item.collection.contains(state.searchQuery, ignoreCase = true) ||
            item.metalPurity.contains(state.searchQuery, ignoreCase = true) ||
            item.subtitle.contains(state.searchQuery, ignoreCase = true)
      }
      matchesCategory && matchesQuery
    }
  }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), JewelryRepository.sampleCatalog)

  val favoriteItems: StateFlow<List<JewelryItem>> = combine(
    favoriteIds,
    _uiState
  ) { favs, _ ->
    JewelryRepository.sampleCatalog.filter { favs.contains(it.id) }
  }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

  fun selectCategory(category: JewelryCategory) {
    _uiState.update { it.copy(selectedCategory = category) }
  }

  fun updateSearchQuery(query: String) {
    _uiState.update { it.copy(searchQuery = query) }
  }

  fun toggleSearch(active: Boolean) {
    _uiState.update {
      it.copy(
        isSearchActive = active,
        searchQuery = if (!active) "" else it.searchQuery
      )
    }
  }

  fun navigateToDetail(itemId: String) {
    _uiState.update { it.copy(currentScreen = AtelierScreen.Detail(itemId)) }
  }

  fun navigateToFavorites() {
    _uiState.update { it.copy(currentScreen = AtelierScreen.Favorites) }
  }

  fun navigateToHome() {
    _uiState.update { it.copy(currentScreen = AtelierScreen.Home) }
  }

  fun navigateToStudio3D(metalId: String = "18k_yellow", stone: String = "diamond") {
    _uiState.update { it.copy(currentScreen = AtelierScreen.Studio3D(metalId, stone)) }
  }

  fun toggleFavorite(itemId: String) {
    JewelryRepository.toggleFavorite(itemId)
    val isFav = JewelryRepository.favoriteIds.value.contains(itemId)
    val item = JewelryRepository.getItemById(itemId)
    showNotification(if (isFav) "Added ${item?.title} to your curation" else "Removed from your curation")
  }

  fun openCart(open: Boolean = true) {
    _uiState.update { it.copy(isCartOpen = open) }
  }

  fun openConsultation(open: Boolean = true) {
    _uiState.update { it.copy(isConsultationOpen = open) }
  }

  fun openRingGuide(open: Boolean = true) {
    _uiState.update { it.copy(isRingGuideOpen = open) }
  }

  fun openCheckout(open: Boolean = true) {
    _uiState.update { it.copy(isCheckoutOpen = open, isCartOpen = false) }
  }

  fun completeCheckout(clientName: String, address: String) {
    val orderId = "ATELIER-" + (1000..9999).random() + "-PARIS"
    JewelryRepository.clearCart()
    _uiState.update {
      it.copy(
        isCheckoutOpen = false,
        lastOrderNumber = orderId,
        notificationMessage = "Order $orderId placed. White-glove courier dispatched."
      )
    }
  }

  fun dismissOrderConfirmation() {
    _uiState.update { it.copy(lastOrderNumber = null) }
  }

  fun addToCart(
    item: JewelryItem,
    metal: MetalOption,
    size: Double?,
    engraving: String
  ) {
    JewelryRepository.addToCart(item, metal, size, engraving)
    showNotification("Added ${item.title} to your Shopping Bag")
    _uiState.update { it.copy(isCartOpen = true) }
  }

  fun updateCartQuantity(cartId: String, qty: Int) {
    JewelryRepository.updateCartQuantity(cartId, qty)
  }

  fun removeCartItem(cartId: String) {
    JewelryRepository.removeCartItem(cartId)
    showNotification("Piece removed from Shopping Bag")
  }

  fun bookConsultation(
    name: String,
    email: String,
    phone: String,
    salon: String,
    date: String,
    time: String,
    notes: String
  ) {
    val booking = ConsultationBooking(
      id = UUID.randomUUID().toString(),
      clientName = name,
      email = email,
      phone = phone,
      appointmentType = salon,
      date = date,
      time = time,
      focusPieceOrNotes = notes
    )
    JewelryRepository.bookConsultation(booking)
    _uiState.update { it.copy(isConsultationOpen = false) }
    showNotification("Private consultation confirmed for $name on $date at $time")
  }

  fun showNotification(msg: String) {
    _uiState.update { it.copy(notificationMessage = msg) }
  }

  fun clearNotification() {
    _uiState.update { it.copy(notificationMessage = null) }
  }
}
