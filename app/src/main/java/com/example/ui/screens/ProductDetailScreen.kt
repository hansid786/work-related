package com.example.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material.icons.outlined.Check
import androidx.compose.material.icons.outlined.Diamond
import androidx.compose.material.icons.outlined.Handyman
import androidx.compose.material.icons.outlined.LocalShipping
import androidx.compose.material.icons.outlined.Straighten
import androidx.compose.material.icons.outlined.Verified
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableDoubleStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.example.model.JewelryItem
import com.example.model.MetalOption
import com.example.ui.components.AtelierPrimaryButton
import com.example.ui.components.AtelierSecondaryButton
import com.example.ui.components.LuxuryBadge
import com.example.ui.components.MetalSwatchSelector
import com.example.ui.components.RingSizeChip
import com.example.ui.theme.AtelierBackground
import com.example.ui.theme.AtelierGoldBadgeBg
import com.example.ui.theme.AtelierHairline
import com.example.ui.theme.AtelierNeutralForeground
import com.example.ui.theme.AtelierOnSurface
import com.example.ui.theme.AtelierPrimaryRoseTaupe
import com.example.ui.theme.AtelierSecondaryGold
import com.example.ui.theme.AtelierSurface
import com.example.ui.theme.AtelierSurfaceContainerLowest
import com.example.ui.theme.AtelierTertiary
import com.example.ui.theme.MontserratFontFamily
import com.example.ui.theme.PlayfairDisplayFontFamily
import java.text.NumberFormat
import java.util.Locale

@Composable
fun ProductDetailScreen(
  item: JewelryItem,
  isFavorite: Boolean,
  onBackClick: () -> Unit,
  onToggleFavorite: () -> Unit,
  onAddToCart: (JewelryItem, MetalOption, Double?, String) -> Unit,
  onOpenConsultation: () -> Unit,
  onOpenRingGuide: () -> Unit,
  onOpenStudio3D: (metalId: String) -> Unit,
  modifier: Modifier = Modifier
) {
  var selectedImageIndex by remember { mutableIntStateOf(0) }
  var selectedMetal by remember { mutableStateOf(item.metalOptions.first()) }
  var selectedSize by remember { mutableStateOf(item.availableSizes.firstOrNull()) }
  var customEngraving by remember { mutableStateOf("") }

  val effectivePrice = item.price + selectedMetal.priceAdjustment
  val currencyFormat = NumberFormat.getCurrencyInstance(Locale("en", "IN")).apply {
    maximumFractionDigits = 0
  }

  Column(
    modifier = modifier
      .fillMaxSize()
      .background(AtelierBackground)
      .verticalScroll(rememberScrollState())
      .testTag("product_detail_screen")
  ) {
    // 1. Detail Top Bar
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 8.dp, vertical = 6.dp),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      IconButton(
        onClick = onBackClick,
        modifier = Modifier.testTag("detail_back_button")
      ) {
        Icon(
          imageVector = Icons.AutoMirrored.Filled.ArrowBack,
          contentDescription = "Back",
          tint = AtelierOnSurface
        )
      }

      Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(
          text = item.collection.uppercase(Locale.ROOT),
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 9.sp,
          letterSpacing = 1.8.sp,
          color = AtelierPrimaryRoseTaupe
        )
        Text(
          text = "ATELIER ARCHIVE",
          fontFamily = PlayfairDisplayFontFamily,
          fontSize = 13.sp,
          letterSpacing = 1.sp,
          color = AtelierOnSurface
        )
      }

      IconButton(
        onClick = onToggleFavorite,
        modifier = Modifier.testTag("detail_favorite_button")
      ) {
        Icon(
          imageVector = if (isFavorite) Icons.Default.Favorite else Icons.Default.FavoriteBorder,
          contentDescription = "Toggle Favorite",
          tint = if (isFavorite) AtelierPrimaryRoseTaupe else AtelierOnSurface
        )
      }
    }

    HorizontalDivider(thickness = 1.dp, color = AtelierHairline)

    // 2. High-Fashion Gallery Viewer
    Box(
      modifier = Modifier
        .fillMaxWidth()
        .aspectRatio(1.05f)
        .background(AtelierSurface)
    ) {
      val currentImage = item.images.getOrElse(selectedImageIndex) { item.images.first() }
      AsyncImage(
        model = currentImage,
        contentDescription = item.title,
        contentScale = ContentScale.Crop,
        modifier = Modifier.fillMaxSize()
      )

      item.badge?.let {
        LuxuryBadge(
          text = it,
          modifier = Modifier
            .align(Alignment.TopStart)
            .padding(16.dp)
        )
      }
    }

    // Thumbnail strip (if multi-image)
    if (item.images.size > 1) {
      LazyRow(
        modifier = Modifier
          .fillMaxWidth()
          .background(AtelierSurface)
          .padding(horizontal = 16.dp, vertical = 10.dp),
        horizontalArrangement = Arrangement.spacedBy(10.dp)
      ) {
        items(item.images.indices.toList()) { index ->
          val isSelected = index == selectedImageIndex
          Box(
            modifier = Modifier
              .size(56.dp)
              .clip(RoundedCornerShape(2.dp))
              .border(
                width = if (isSelected) 1.5.dp else 1.dp,
                color = if (isSelected) AtelierTertiary else AtelierHairline,
                shape = RoundedCornerShape(2.dp)
              )
              .clickable { selectedImageIndex = index }
          ) {
            AsyncImage(
              model = item.images[index],
              contentDescription = "Thumbnail $index",
              contentScale = ContentScale.Crop,
              modifier = Modifier.fillMaxSize()
            )
          }
        }
      }
    }

    // 2b. 3D Examine Callout Button
    Surface(
      shape = RoundedCornerShape(2.dp),
      color = AtelierSurfaceContainerLowest,
      border = BorderStroke(1.dp, AtelierHairline),
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 16.dp, vertical = 6.dp)
        .clickable { onOpenStudio3D(selectedMetal.id) }
        .testTag("examine_3d_button")
    ) {
      Row(
        modifier = Modifier
          .fillMaxWidth()
          .padding(horizontal = 14.dp, vertical = 10.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
          Icon(
            imageVector = Icons.Outlined.Diamond,
            contentDescription = null,
            tint = AtelierSecondaryGold,
            modifier = Modifier.size(18.dp)
          )
          Spacer(modifier = Modifier.width(10.dp))
          Column {
            Text(
              text = "EXAMINE IN 3D ATELIER",
              fontFamily = MontserratFontFamily,
              fontWeight = FontWeight.Medium,
              fontSize = 11.sp,
              letterSpacing = 1.4.sp,
              color = AtelierTertiary
            )
            Text(
              text = "360° PBR inspection with live metal and stone switching",
              fontFamily = MontserratFontFamily,
              fontSize = 9.sp,
              color = AtelierNeutralForeground
            )
          }
        }

        Surface(
          shape = RoundedCornerShape(2.dp),
          color = AtelierTertiary
        ) {
          Text(
            text = "3D VIEW",
            fontFamily = MontserratFontFamily,
            fontWeight = FontWeight.Medium,
            fontSize = 9.sp,
            letterSpacing = 1.2.sp,
            color = AtelierBackground,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
          )
        }
      }
    }

    HorizontalDivider(thickness = 1.dp, color = AtelierHairline)

    // 3. Piece Nomenclature & Pricing
    Column(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 20.dp, vertical = 18.dp)
    ) {
      Text(
        text = item.metalPurity.uppercase(Locale.ROOT),
        fontFamily = MontserratFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 10.sp,
        letterSpacing = 1.8.sp,
        color = AtelierNeutralForeground
      )

      Spacer(modifier = Modifier.height(4.dp))

      Text(
        text = item.title,
        fontFamily = PlayfairDisplayFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 26.sp,
        lineHeight = 32.sp,
        color = AtelierOnSurface
      )

      Spacer(modifier = Modifier.height(6.dp))

      Text(
        text = item.subtitle,
        fontFamily = MontserratFontFamily,
        fontSize = 13.sp,
        color = AtelierNeutralForeground
      )

      Spacer(modifier = Modifier.height(14.dp))

      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Text(
          text = currencyFormat.format(effectivePrice),
          fontFamily = PlayfairDisplayFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 24.sp,
          color = AtelierTertiary
        )

        Surface(
          shape = RoundedCornerShape(2.dp),
          color = AtelierGoldBadgeBg,
          border = BorderStroke(1.dp, AtelierHairline)
        ) {
          Row(
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp),
            verticalAlignment = Alignment.CenterVertically
          ) {
            Icon(
              imageVector = Icons.Outlined.Verified,
              contentDescription = null,
              tint = AtelierSecondaryGold,
              modifier = Modifier.size(14.dp)
            )
            Spacer(modifier = Modifier.width(4.dp))
            Text(
              text = "GIA CERTIFIED",
              fontFamily = MontserratFontFamily,
              fontWeight = FontWeight.Medium,
              fontSize = 9.sp,
              letterSpacing = 1.sp,
              color = AtelierPrimaryRoseTaupe
            )
          }
        }
      }
    }

    HorizontalDivider(thickness = 1.dp, color = AtelierHairline)

    // 4. Precious Metal Selection
    Column(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 20.dp, vertical = 14.dp)
    ) {
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Text(
          text = "PRECIOUS METAL",
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 10.sp,
          letterSpacing = 1.6.sp,
          color = AtelierPrimaryRoseTaupe
        )
        Text(
          text = selectedMetal.name,
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 12.sp,
          color = AtelierOnSurface
        )
      }

      Spacer(modifier = Modifier.height(10.dp))

      MetalSwatchSelector(
        options = item.metalOptions,
        selectedOption = selectedMetal,
        onSelect = { selectedMetal = it }
      )
    }

    // 5. Ring / Wrist Size Selection (if applicable)
    if (item.availableSizes.isNotEmpty()) {
      HorizontalDivider(thickness = 1.dp, color = AtelierHairline)

      Column(
        modifier = Modifier
          .fillMaxWidth()
          .padding(horizontal = 20.dp, vertical = 14.dp)
      ) {
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Text(
            text = "SELECT SIZE (US)",
            fontFamily = MontserratFontFamily,
            fontWeight = FontWeight.Medium,
            fontSize = 10.sp,
            letterSpacing = 1.6.sp,
            color = AtelierPrimaryRoseTaupe
          )

          Row(
            modifier = Modifier.clickable(onClick = onOpenRingGuide),
            verticalAlignment = Alignment.CenterVertically
          ) {
            Icon(
              imageVector = Icons.Outlined.Straighten,
              contentDescription = null,
              tint = AtelierSecondaryGold,
              modifier = Modifier.size(14.dp)
            )
            Spacer(modifier = Modifier.width(4.dp))
            Text(
              text = "RING SIZE GUIDE",
              fontFamily = MontserratFontFamily,
              fontWeight = FontWeight.Medium,
              fontSize = 10.sp,
              letterSpacing = 1.sp,
              color = AtelierSecondaryGold
            )
          }
        }

        Spacer(modifier = Modifier.height(12.dp))

        LazyRow(
          horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
          items(item.availableSizes) { size ->
            RingSizeChip(
              size = size,
              isSelected = size == selectedSize,
              onSelect = { selectedSize = size }
            )
          }
        }
      }
    }

    // 6. Custom Atelier Engraving (if allowed)
    if (item.allowsEngraving) {
      HorizontalDivider(thickness = 1.dp, color = AtelierHairline)

      Column(
        modifier = Modifier
          .fillMaxWidth()
          .padding(horizontal = 20.dp, vertical = 14.dp)
      ) {
        Text(
          text = "BESPOKE HAND-ENGRAVING (COMPLIMENTARY)",
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 10.sp,
          letterSpacing = 1.6.sp,
          color = AtelierPrimaryRoseTaupe
        )

        Spacer(modifier = Modifier.height(6.dp))

        OutlinedTextField(
          value = customEngraving,
          onValueChange = { if (it.length <= 25) customEngraving = it },
          placeholder = {
            Text(
              text = "e.g., A & M • 24.09.26 (Max 25 characters)",
              fontFamily = MontserratFontFamily,
              fontSize = 12.sp,
              color = AtelierNeutralForeground
            )
          },
          singleLine = true,
          modifier = Modifier
            .fillMaxWidth()
            .testTag("engraving_input"),
          colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = AtelierTertiary,
            unfocusedBorderColor = AtelierHairline,
            focusedContainerColor = AtelierSurfaceContainerLowest,
            unfocusedContainerColor = AtelierSurfaceContainerLowest
          )
        )

        if (customEngraving.isNotBlank()) {
          Spacer(modifier = Modifier.height(6.dp))
          Surface(
            shape = RoundedCornerShape(2.dp),
            color = AtelierGoldBadgeBg,
            modifier = Modifier.fillMaxWidth()
          ) {
            Text(
              text = "Engraving Preview: \"$customEngraving\"",
              fontFamily = PlayfairDisplayFontFamily,
              fontSize = 12.sp,
              color = AtelierTertiary,
              modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
            )
          }
        }
      }
    }

    HorizontalDivider(thickness = 1.dp, color = AtelierHairline)

    // 7. Gemstone Dossier & Technical Specifications
    Column(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 20.dp, vertical = 16.dp)
    ) {
      Text(
        text = "GEMOLOGICAL SPECIFICATIONS",
        fontFamily = MontserratFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 10.sp,
        letterSpacing = 1.6.sp,
        color = AtelierPrimaryRoseTaupe
      )

      Spacer(modifier = Modifier.height(8.dp))

      Card(
        shape = RoundedCornerShape(2.dp),
        colors = CardDefaults.cardColors(containerColor = AtelierSurfaceContainerLowest),
        border = BorderStroke(1.dp, AtelierHairline),
        modifier = Modifier.fillMaxWidth()
      ) {
        Column(modifier = Modifier.padding(16.dp)) {
          Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(
              imageVector = Icons.Outlined.Diamond,
              contentDescription = null,
              tint = AtelierSecondaryGold,
              modifier = Modifier.size(18.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
              text = item.gemstoneSpecs,
              fontFamily = MontserratFontFamily,
              fontSize = 12.sp,
              lineHeight = 18.sp,
              color = AtelierOnSurface
            )
          }

          Spacer(modifier = Modifier.height(10.dp))
          HorizontalDivider(thickness = 1.dp, color = AtelierHairline)
          Spacer(modifier = Modifier.height(10.dp))

          Text(
            text = item.description,
            fontFamily = MontserratFontFamily,
            fontSize = 13.sp,
            lineHeight = 20.sp,
            color = AtelierNeutralForeground
          )

          Spacer(modifier = Modifier.height(10.dp))

          Text(
            text = "Craftsmanship: ${item.craftsmanshipStory}",
            fontFamily = MontserratFontFamily,
            fontSize = 12.sp,
            lineHeight = 18.sp,
            color = AtelierNeutralForeground
          )
        }
      }
    }

    // 8. White-Glove Promises
    Column(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 20.dp, vertical = 8.dp)
    ) {
      Row(verticalAlignment = Alignment.CenterVertically) {
        Icon(Icons.Outlined.LocalShipping, contentDescription = null, tint = AtelierSecondaryGold, modifier = Modifier.size(16.dp))
        Spacer(modifier = Modifier.width(8.dp))
        Text(
          text = "Complimentary insured worldwide courier shipping",
          fontFamily = MontserratFontFamily,
          fontSize = 11.sp,
          color = AtelierNeutralForeground
        )
      }
      Spacer(modifier = Modifier.height(6.dp))
      Row(verticalAlignment = Alignment.CenterVertically) {
        Icon(Icons.Outlined.Handyman, contentDescription = null, tint = AtelierSecondaryGold, modifier = Modifier.size(16.dp))
        Spacer(modifier = Modifier.width(8.dp))
        Text(
          text = "Complimentary 30-day resizing & lifetime inspection",
          fontFamily = MontserratFontFamily,
          fontSize = 11.sp,
          color = AtelierNeutralForeground
        )
      }
    }

    Spacer(modifier = Modifier.height(16.dp))

    // 9. Sticky / Fixed CTA Bar
    Surface(
      shape = RoundedCornerShape(topStart = 4.dp, topEnd = 4.dp),
      color = AtelierSurfaceContainerLowest,
      border = BorderStroke(1.dp, AtelierHairline),
      modifier = Modifier.fillMaxWidth()
    ) {
      Column(
        modifier = Modifier.padding(20.dp)
      ) {
        AtelierPrimaryButton(
          text = "ADD TO SHOPPING BAG • ${currencyFormat.format(effectivePrice)}",
          onClick = {
            onAddToCart(item, selectedMetal, selectedSize, customEngraving)
          },
          modifier = Modifier.fillMaxWidth(),
          testTag = "detail_add_to_cart_button"
        )

        Spacer(modifier = Modifier.height(10.dp))

        AtelierSecondaryButton(
          text = "REQUEST BESPOKE COMMISSIONS",
          onClick = onOpenConsultation,
          modifier = Modifier.fillMaxWidth(),
          testTag = "detail_request_bespoke_button"
        )
      }
    }
  }
}
