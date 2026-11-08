package com.example.ui.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.outlined.ShoppingBag
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.example.model.JewelryItem
import com.example.model.MetalOption
import com.example.ui.theme.AtelierGoldBadgeBg
import com.example.ui.theme.AtelierGoldBadgeBorder
import com.example.ui.theme.AtelierHairline
import com.example.ui.theme.AtelierNeutralForeground
import com.example.ui.theme.AtelierOnSurface
import com.example.ui.theme.AtelierOnTertiary
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
fun AtelierTopAppBar(
  title: String = "RIVA JEWELS",
  subtitle: String = "FINE JEWELLERY",
  canNavigateBack: Boolean = false,
  onBackClick: () -> Unit = {},
  onSearchClick: () -> Unit = {},
  onFavoritesClick: () -> Unit = {},
  onCartClick: () -> Unit = {},
  favoriteCount: Int = 0,
  cartCount: Int = 0,
  modifier: Modifier = Modifier
) {
  Column(
    modifier = modifier
      .fillMaxWidth()
      .background(AtelierSurface)
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 8.dp, vertical = 6.dp),
      verticalAlignment = Alignment.CenterVertically,
      horizontalArrangement = Arrangement.SpaceBetween
    ) {
      Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier.weight(1f)
      ) {
        if (canNavigateBack) {
          IconButton(
            onClick = onBackClick,
            modifier = Modifier.testTag("back_button")
          ) {
            Icon(
              imageVector = Icons.AutoMirrored.Filled.ArrowBack,
              contentDescription = "Navigate Back",
              tint = AtelierOnSurface
            )
          }
        } else {
          IconButton(
            onClick = onSearchClick,
            modifier = Modifier.testTag("search_button")
          ) {
            Icon(
              imageVector = Icons.Default.Search,
              contentDescription = "Search Collections",
              tint = AtelierOnSurface
            )
          }
        }

        Column(
          modifier = Modifier.padding(start = 4.dp)
        ) {
          Text(
            text = title,
            fontFamily = PlayfairDisplayFontFamily,
            fontWeight = FontWeight.Medium,
            fontSize = 20.sp,
            letterSpacing = 4.sp,
            color = AtelierOnSurface
          )
          Text(
            text = subtitle,
            fontFamily = MontserratFontFamily,
            fontWeight = FontWeight.Normal,
            fontSize = 9.sp,
            letterSpacing = 2.sp,
            color = AtelierNeutralForeground
          )
        }
      }

      Row(
        verticalAlignment = Alignment.CenterVertically
      ) {
        IconButton(
          onClick = onFavoritesClick,
          modifier = Modifier.testTag("wishlist_button")
        ) {
          BadgedBox(
            badge = {
              if (favoriteCount > 0) {
                Badge(
                  containerColor = AtelierPrimaryRoseTaupe,
                  contentColor = Color.White
                ) {
                  Text(
                    text = favoriteCount.toString(),
                    fontFamily = MontserratFontFamily,
                    fontSize = 10.sp
                  )
                }
              }
            }
          ) {
            Icon(
              imageVector = if (favoriteCount > 0) Icons.Default.Favorite else Icons.Default.FavoriteBorder,
              contentDescription = "Saved Curations",
              tint = if (favoriteCount > 0) AtelierPrimaryRoseTaupe else AtelierOnSurface
            )
          }
        }

        IconButton(
          onClick = onCartClick,
          modifier = Modifier.testTag("cart_button")
        ) {
          BadgedBox(
            badge = {
              if (cartCount > 0) {
                Badge(
                  containerColor = AtelierTertiary,
                  contentColor = AtelierOnTertiary
                ) {
                  Text(
                    text = cartCount.toString(),
                    fontFamily = MontserratFontFamily,
                    fontSize = 10.sp
                  )
                }
              }
            }
          ) {
            Icon(
              imageVector = Icons.Outlined.ShoppingBag,
              contentDescription = "Shopping Bag",
              tint = AtelierOnSurface
            )
          }
        }
      }
    }

    HorizontalDivider(
      thickness = 1.dp,
      color = AtelierHairline
    )
  }
}

@Composable
fun AtelierSearchBar(
  query: String,
  onQueryChange: (String) -> Unit,
  onClose: () -> Unit,
  modifier: Modifier = Modifier
) {
  Row(
    modifier = modifier
      .fillMaxWidth()
      .background(AtelierSurface)
      .padding(horizontal = 16.dp, vertical = 8.dp),
    verticalAlignment = Alignment.CenterVertically
  ) {
    TextField(
      value = query,
      onValueChange = onQueryChange,
      modifier = Modifier
        .weight(1f)
        .testTag("search_input"),
      placeholder = {
        Text(
          text = "Search by stone, metal, or collection...",
          fontFamily = MontserratFontFamily,
          fontSize = 13.sp,
          color = AtelierNeutralForeground
        )
      },
      singleLine = true,
      colors = TextFieldDefaults.colors(
        focusedContainerColor = Color.Transparent,
        unfocusedContainerColor = Color.Transparent,
        focusedIndicatorColor = AtelierPrimaryRoseTaupe,
        unfocusedIndicatorColor = AtelierHairline,
        cursorColor = AtelierTertiary,
        focusedTextColor = AtelierOnSurface,
        unfocusedTextColor = AtelierOnSurface
      )
    )

    IconButton(
      onClick = onClose,
      modifier = Modifier.testTag("close_search_button")
    ) {
      Icon(
        imageVector = Icons.Default.Close,
        contentDescription = "Close Search",
        tint = AtelierOnSurface
      )
    }
  }
}

@Composable
fun LuxuryBadge(
  text: String,
  modifier: Modifier = Modifier
) {
  Surface(
    modifier = modifier,
    shape = RoundedCornerShape(2.dp),
    color = AtelierGoldBadgeBg,
    border = BorderStroke(1.dp, AtelierGoldBadgeBorder)
  ) {
    Text(
      text = text.uppercase(Locale.ROOT),
      fontFamily = MontserratFontFamily,
      fontWeight = FontWeight.Medium,
      fontSize = 9.sp,
      letterSpacing = 1.6.sp,
      color = AtelierPrimaryRoseTaupe,
      modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
    )
  }
}

@Composable
fun AtelierPrimaryButton(
  text: String,
  onClick: () -> Unit,
  modifier: Modifier = Modifier,
  enabled: Boolean = true,
  testTag: String = "primary_cta_button"
) {
  Button(
    onClick = onClick,
    enabled = enabled,
    shape = RoundedCornerShape(2.dp),
    colors = ButtonDefaults.buttonColors(
      containerColor = AtelierTertiary,
      contentColor = AtelierOnTertiary,
      disabledContainerColor = AtelierHairline,
      disabledContentColor = AtelierNeutralForeground
    ),
    contentPadding = PaddingValues(horizontal = 24.dp, vertical = 14.dp),
    modifier = modifier.testTag(testTag)
  ) {
    Text(
      text = text.uppercase(Locale.ROOT),
      fontFamily = MontserratFontFamily,
      fontWeight = FontWeight.Medium,
      fontSize = 12.sp,
      letterSpacing = 1.8.sp,
      textAlign = TextAlign.Center
    )
  }
}

@Composable
fun AtelierSecondaryButton(
  text: String,
  onClick: () -> Unit,
  modifier: Modifier = Modifier,
  enabled: Boolean = true,
  testTag: String = "secondary_cta_button"
) {
  OutlinedButton(
    onClick = onClick,
    enabled = enabled,
    shape = RoundedCornerShape(2.dp),
    border = BorderStroke(1.dp, AtelierTertiary),
    colors = ButtonDefaults.outlinedButtonColors(
      contentColor = AtelierTertiary
    ),
    contentPadding = PaddingValues(horizontal = 20.dp, vertical = 13.dp),
    modifier = modifier.testTag(testTag)
  ) {
    Text(
      text = text.uppercase(Locale.ROOT),
      fontFamily = MontserratFontFamily,
      fontWeight = FontWeight.Medium,
      fontSize = 12.sp,
      letterSpacing = 1.8.sp,
      textAlign = TextAlign.Center
    )
  }
}

@Composable
fun ProductGridCard(
  item: JewelryItem,
  isFavorite: Boolean,
  onItemClick: () -> Unit,
  onToggleFavorite: () -> Unit,
  modifier: Modifier = Modifier
) {
  val currencyFormat = NumberFormat.getCurrencyInstance(Locale("en", "IN")).apply {
    maximumFractionDigits = 0
  }

  Surface(
    modifier = modifier
      .fillMaxWidth()
      .clip(RoundedCornerShape(2.dp))
      .clickable(onClick = onItemClick)
      .testTag("product_card_${item.id}"),
    color = AtelierSurfaceContainerLowest,
    border = BorderStroke(1.dp, AtelierHairline)
  ) {
    Column(
      modifier = Modifier.fillMaxWidth()
    ) {
      Box(
        modifier = Modifier
          .fillMaxWidth()
          .aspectRatio(1f)
          .background(AtelierSurface)
      ) {
        AsyncImage(
          model = item.images.firstOrNull(),
          contentDescription = item.title,
          contentScale = ContentScale.Crop,
          modifier = Modifier.fillMaxWidth().aspectRatio(1f)
        )

        item.badge?.let { badgeText ->
          LuxuryBadge(
            text = badgeText,
            modifier = Modifier
              .align(Alignment.TopStart)
              .padding(8.dp)
          )
        }

        IconButton(
          onClick = onToggleFavorite,
          modifier = Modifier
            .align(Alignment.TopEnd)
            .padding(4.dp)
            .testTag("favorite_button_${item.id}")
        ) {
          Icon(
            imageVector = if (isFavorite) Icons.Default.Favorite else Icons.Default.FavoriteBorder,
            contentDescription = "Toggle Favorite",
            tint = if (isFavorite) AtelierPrimaryRoseTaupe else AtelierTertiary.copy(alpha = 0.7f),
            modifier = Modifier.size(20.dp)
          )
        }
      }

      Column(
        modifier = Modifier
          .fillMaxWidth()
          .padding(horizontal = 12.dp, vertical = 12.dp),
        horizontalAlignment = Alignment.CenterHorizontally
      ) {
        Text(
          text = item.metalPurity.uppercase(Locale.ROOT),
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 9.sp,
          letterSpacing = 1.5.sp,
          color = AtelierNeutralForeground,
          maxLines = 1,
          overflow = TextOverflow.Ellipsis,
          textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(4.dp))

        Text(
          text = item.title,
          fontFamily = PlayfairDisplayFontFamily,
          fontWeight = FontWeight.Normal,
          fontSize = 15.sp,
          letterSpacing = 0.5.sp,
          color = AtelierOnSurface,
          maxLines = 1,
          overflow = TextOverflow.Ellipsis,
          textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(4.dp))

        Text(
          text = currencyFormat.format(item.price),
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 13.sp,
          letterSpacing = 0.8.sp,
          color = AtelierTertiary,
          textAlign = TextAlign.Center
        )
      }
    }
  }
}

@Composable
fun MetalSwatchSelector(
  options: List<MetalOption>,
  selectedOption: MetalOption,
  onSelect: (MetalOption) -> Unit,
  modifier: Modifier = Modifier
) {
  Row(
    modifier = modifier,
    horizontalArrangement = Arrangement.spacedBy(14.dp),
    verticalAlignment = Alignment.CenterVertically
  ) {
    options.forEach { metal ->
      val isSelected = metal.id == selectedOption.id
      Box(
        modifier = Modifier
          .size(34.dp)
          .clip(CircleShape)
          .border(
            width = if (isSelected) 2.dp else 1.dp,
            color = if (isSelected) AtelierTertiary else AtelierHairline,
            shape = CircleShape
          )
          .padding(3.dp)
          .clip(CircleShape)
          .background(Color(metal.colorHex))
          .clickable { onSelect(metal) }
          .testTag("metal_swatch_${metal.id}")
      )
    }
  }
}

@Composable
fun RingSizeChip(
  size: Double,
  isSelected: Boolean,
  onSelect: () -> Unit,
  modifier: Modifier = Modifier
) {
  Box(
    modifier = modifier
      .size(42.dp)
      .clip(RoundedCornerShape(2.dp))
      .border(
        width = 1.dp,
        color = if (isSelected) AtelierTertiary else AtelierHairline,
        shape = RoundedCornerShape(2.dp)
      )
      .background(if (isSelected) AtelierTertiary else AtelierSurfaceContainerLowest)
      .clickable(onClick = onSelect)
      .testTag("ring_size_chip_$size"),
    contentAlignment = Alignment.Center
  ) {
    Text(
      text = size.toString(),
      fontFamily = MontserratFontFamily,
      fontWeight = if (isSelected) FontWeight.SemiBold else FontWeight.Normal,
      fontSize = 12.sp,
      color = if (isSelected) AtelierOnTertiary else AtelierOnSurface
    )
  }
}
