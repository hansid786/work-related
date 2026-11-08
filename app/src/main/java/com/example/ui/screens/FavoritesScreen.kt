package com.example.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.outlined.Diamond
import androidx.compose.material.icons.outlined.Mail
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.model.JewelryItem
import com.example.ui.components.AtelierPrimaryButton
import com.example.ui.components.ProductGridCard
import com.example.ui.theme.AtelierBackground
import com.example.ui.theme.AtelierHairline
import com.example.ui.theme.AtelierNeutralForeground
import com.example.ui.theme.AtelierOnSurface
import com.example.ui.theme.AtelierPrimaryRoseTaupe
import com.example.ui.theme.AtelierSecondaryGold
import com.example.ui.theme.AtelierSurface
import com.example.ui.theme.AtelierTertiary
import com.example.ui.theme.MontserratFontFamily
import com.example.ui.theme.PlayfairDisplayFontFamily
import java.util.Locale

@Composable
fun FavoritesScreen(
  favoriteItems: List<JewelryItem>,
  onBackClick: () -> Unit,
  onItemClick: (String) -> Unit,
  onToggleFavorite: (String) -> Unit,
  onOpenConsultation: () -> Unit,
  modifier: Modifier = Modifier
) {
  Column(
    modifier = modifier
      .fillMaxSize()
      .background(AtelierBackground)
      .testTag("favorites_screen")
  ) {
    // Header
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 8.dp, vertical = 6.dp),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      IconButton(
        onClick = onBackClick,
        modifier = Modifier.testTag("favorites_back_button")
      ) {
        Icon(
          imageVector = Icons.AutoMirrored.Filled.ArrowBack,
          contentDescription = "Back",
          tint = AtelierOnSurface
        )
      }

      Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(
          text = "SAVED CURATIONS",
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 10.sp,
          letterSpacing = 2.sp,
          color = AtelierPrimaryRoseTaupe
        )
        Text(
          text = "${favoriteItems.size} Selected Pieces",
          fontFamily = PlayfairDisplayFontFamily,
          fontSize = 14.sp,
          color = AtelierOnSurface
        )
      }

      Box(modifier = Modifier.size(48.dp))
    }

    HorizontalDivider(thickness = 1.dp, color = AtelierHairline)

    if (favoriteItems.isEmpty()) {
      Column(
        modifier = Modifier
          .fillMaxSize()
          .padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
      ) {
        Icon(
          imageVector = Icons.Outlined.Diamond,
          contentDescription = null,
          tint = AtelierSecondaryGold,
          modifier = Modifier.size(54.dp)
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text(
          text = "Your private curation is empty",
          fontFamily = PlayfairDisplayFontFamily,
          fontSize = 20.sp,
          color = AtelierOnSurface,
          textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(8.dp))
        Text(
          text = "Bookmark rare gemstones and fine creations while exploring our monographs to review them together.",
          fontFamily = MontserratFontFamily,
          fontSize = 13.sp,
          lineHeight = 20.sp,
          color = AtelierNeutralForeground,
          textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(24.dp))
        AtelierPrimaryButton(
          text = "EXPLORE THE MONOGRAPHS",
          onClick = onBackClick
        )
      }
    } else {
      LazyVerticalGrid(
        columns = GridCells.Fixed(2),
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
      ) {
        item(span = { GridItemSpan(2) }) {
          Surface(
            shape = RoundedCornerShape(2.dp),
            color = AtelierSurface,
            border = BorderStroke(1.dp, AtelierHairline),
            modifier = Modifier.fillMaxWidth()
          ) {
            Row(
              modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
              horizontalArrangement = Arrangement.SpaceBetween,
              verticalAlignment = Alignment.CenterVertically
            ) {
              Column(modifier = Modifier.weight(1f)) {
                Text(
                  text = "CONCIERGE INQUIRY",
                  fontFamily = MontserratFontFamily,
                  fontWeight = FontWeight.Medium,
                  fontSize = 9.sp,
                  letterSpacing = 1.6.sp,
                  color = AtelierPrimaryRoseTaupe
                )
                Text(
                  text = "Discuss this curation with our Master Gemologist",
                  fontFamily = PlayfairDisplayFontFamily,
                  fontSize = 13.sp,
                  color = AtelierOnSurface
                )
              }

              Surface(
                shape = RoundedCornerShape(2.dp),
                color = AtelierTertiary,
                modifier = Modifier
                  .clickable(onClick = onOpenConsultation)
                  .testTag("inquire_curation_button")
              ) {
                Text(
                  text = "INQUIRE",
                  fontFamily = MontserratFontFamily,
                  fontWeight = FontWeight.Medium,
                  fontSize = 10.sp,
                  letterSpacing = 1.2.sp,
                  color = AtelierBackground,
                  modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp)
                )
              }
            }
          }
        }

        items(favoriteItems, key = { it.id }) { item ->
          ProductGridCard(
            item = item,
            isFavorite = true,
            onItemClick = { onItemClick(item.id) },
            onToggleFavorite = { onToggleFavorite(item.id) }
          )
        }
      }
    }
  }
}
