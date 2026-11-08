package com.example.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.AutoAwesome
import androidx.compose.material.icons.outlined.CalendarMonth
import androidx.compose.material.icons.outlined.Diamond
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
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
import com.example.model.JewelryCategory
import com.example.model.JewelryItem
import com.example.ui.components.AtelierPrimaryButton
import com.example.ui.components.AtelierSecondaryButton
import com.example.ui.components.LuxuryBadge
import com.example.ui.components.ProductGridCard
import com.example.ui.theme.AtelierBackground
import com.example.ui.theme.AtelierGoldBadgeBg
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
import java.util.Locale

@Composable
fun HomeScreen(
  catalog: List<JewelryItem>,
  favoriteIds: Set<String>,
  selectedCategory: JewelryCategory,
  onSelectCategory: (JewelryCategory) -> Unit,
  onItemClick: (String) -> Unit,
  onToggleFavorite: (String) -> Unit,
  onOpenConsultation: () -> Unit,
  onOpenRingGuide: () -> Unit,
  onOpenStudio3D: () -> Unit,
  modifier: Modifier = Modifier
) {
  LazyVerticalGrid(
    columns = GridCells.Fixed(2),
    modifier = modifier
      .fillMaxSize()
      .background(AtelierBackground)
      .testTag("home_screen_grid"),
    contentPadding = PaddingValues(bottom = 40.dp),
    horizontalArrangement = Arrangement.spacedBy(12.dp),
    verticalArrangement = Arrangement.spacedBy(12.dp)
  ) {
    // 1. Editorial Hero Monograph Banner (Span 2)
    item(span = { GridItemSpan(2) }) {
      EditorialHeroBanner(
        onExploreClick = {
          catalog.firstOrNull()?.id?.let(onItemClick)
        },
        onOpenRingGuide = onOpenRingGuide,
        onOpenStudio3D = onOpenStudio3D
      )
    }

    // 2. Category Filter Bar (Span 2)
    item(span = { GridItemSpan(2) }) {
      CategoryFilterRow(
        selectedCategory = selectedCategory,
        onSelectCategory = onSelectCategory
      )
    }

    // 3. Collection Header Subtext (Span 2)
    item(span = { GridItemSpan(2) }) {
      Column(
        modifier = Modifier
          .fillMaxWidth()
          .padding(horizontal = 16.dp, vertical = 6.dp),
        horizontalAlignment = Alignment.CenterHorizontally
      ) {
        Text(
          text = "THE MONOGRAPHS",
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 10.sp,
          letterSpacing = 2.4.sp,
          color = AtelierPrimaryRoseTaupe
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
          text = selectedCategory.displayName,
          fontFamily = PlayfairDisplayFontFamily,
          fontWeight = FontWeight.Normal,
          fontSize = 24.sp,
          color = AtelierOnSurface
        )
        Text(
          text = "${catalog.size} Artisanal Pieces Available",
          fontFamily = MontserratFontFamily,
          fontSize = 11.sp,
          color = AtelierNeutralForeground
        )
      }
    }

    // 4. Product Cards (2 per row)
    items(catalog, key = { it.id }) { item ->
      ProductGridCard(
        item = item,
        isFavorite = favoriteIds.contains(item.id),
        onItemClick = { onItemClick(item.id) },
        onToggleFavorite = { onToggleFavorite(item.id) },
        modifier = Modifier.padding(horizontal = 4.dp)
      )
    }

    // 4b. 3D Atelier Monograph Experience (Span 2)
    item(span = { GridItemSpan(2) }) {
      Interactive3DStudioBanner(onOpenStudio3D = onOpenStudio3D)
    }

    // 5. Editorial Craftsmanship Monograph (Span 2)
    item(span = { GridItemSpan(2) }) {
      EditorialCraftStorySection(
        onOpenConsultation = onOpenConsultation
      )
    }

    // 6. Atelier Private Consultation Banner (Span 2)
    item(span = { GridItemSpan(2) }) {
      AtelierConsultationBanner(
        onOpenConsultation = onOpenConsultation
      )
    }
  }
}

@Composable
fun EditorialHeroBanner(
  onExploreClick: () -> Unit,
  onOpenRingGuide: () -> Unit,
  onOpenStudio3D: () -> Unit,
  modifier: Modifier = Modifier
) {
  Box(
    modifier = modifier
      .fillMaxWidth()
      .aspectRatio(1.15f)
      .background(AtelierTertiary)
  ) {
    AsyncImage(
      model = "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80",
      contentDescription = "Atelier Monograph Campaign",
      contentScale = ContentScale.Crop,
      modifier = Modifier.fillMaxSize()
    )

    // Dark gradient overlay for editorial elegance
    Box(
      modifier = Modifier
        .fillMaxSize()
        .background(Color.Black.copy(alpha = 0.45f))
    )

    Column(
      modifier = Modifier
        .fillMaxSize()
        .padding(24.dp),
      verticalArrangement = Arrangement.Bottom,
      horizontalAlignment = Alignment.Start
    ) {
      LuxuryBadge(
        text = "RIVA JEWELS • HAUTE CREATIONS",
        modifier = Modifier.padding(bottom = 10.dp)
      )

      Text(
        text = "The Riva Solstice Collection",
        fontFamily = PlayfairDisplayFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 32.sp,
        lineHeight = 38.sp,
        color = Color.White
      )

      Spacer(modifier = Modifier.height(6.dp))

      Text(
        text = "Mastercrafted 18-karat BIS hallmarked gold & certified natural diamonds sculpted for eternal brilliance.",
        fontFamily = MontserratFontFamily,
        fontWeight = FontWeight.Light,
        fontSize = 13.sp,
        lineHeight = 20.sp,
        color = AtelierSurface.copy(alpha = 0.9f)
      )

      Spacer(modifier = Modifier.height(16.dp))

      Row(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalAlignment = Alignment.CenterVertically
      ) {
        Surface(
          shape = RoundedCornerShape(2.dp),
          color = AtelierSurface,
          modifier = Modifier.clickable(onClick = onExploreClick)
        ) {
          Text(
            text = "DISCOVER",
            fontFamily = MontserratFontFamily,
            fontWeight = FontWeight.Medium,
            fontSize = 11.sp,
            letterSpacing = 1.4.sp,
            color = AtelierTertiary,
            modifier = Modifier.padding(horizontal = 14.dp, vertical = 11.dp)
          )
        }

        Surface(
          shape = RoundedCornerShape(2.dp),
          color = AtelierSecondaryGold,
          modifier = Modifier
            .clickable(onClick = onOpenStudio3D)
            .testTag("launch_3d_hero_button")
        ) {
          Text(
            text = "3D ATELIER",
            fontFamily = MontserratFontFamily,
            fontWeight = FontWeight.SemiBold,
            fontSize = 11.sp,
            letterSpacing = 1.4.sp,
            color = AtelierTertiary,
            modifier = Modifier.padding(horizontal = 14.dp, vertical = 11.dp)
          )
        }

        Surface(
          shape = RoundedCornerShape(2.dp),
          color = Color.Transparent,
          border = BorderStroke(1.dp, Color.White.copy(alpha = 0.7f)),
          modifier = Modifier.clickable(onClick = onOpenRingGuide)
        ) {
          Text(
            text = "SIZER",
            fontFamily = MontserratFontFamily,
            fontWeight = FontWeight.Medium,
            fontSize = 11.sp,
            letterSpacing = 1.4.sp,
            color = Color.White,
            modifier = Modifier.padding(horizontal = 12.dp, vertical = 11.dp)
          )
        }
      }
    }
  }
}

@Composable
fun Interactive3DStudioBanner(
  onOpenStudio3D: () -> Unit,
  modifier: Modifier = Modifier
) {
  Surface(
    shape = RoundedCornerShape(2.dp),
    color = AtelierSurfaceContainerLowest,
    border = BorderStroke(1.dp, AtelierHairline),
    modifier = modifier
      .fillMaxWidth()
      .padding(horizontal = 12.dp, vertical = 10.dp)
  ) {
    Column(
      modifier = Modifier.padding(20.dp),
      horizontalAlignment = Alignment.CenterHorizontally
    ) {
      Row(verticalAlignment = Alignment.CenterVertically) {
        Icon(
          imageVector = Icons.Outlined.Diamond,
          contentDescription = null,
          tint = AtelierSecondaryGold,
          modifier = Modifier.size(18.dp)
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text(
          text = "THREE.JS 3D RIVA JEWELS STUDIO",
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 10.sp,
          letterSpacing = 1.8.sp,
          color = AtelierPrimaryRoseTaupe
        )
      }

      Spacer(modifier = Modifier.height(8.dp))

      Text(
        text = "Examine Solitaires & Pavé in 360° Studio PBR",
        fontFamily = PlayfairDisplayFontFamily,
        fontSize = 20.sp,
        lineHeight = 26.sp,
        color = AtelierOnSurface,
        textAlign = TextAlign.Center
      )

      Spacer(modifier = Modifier.height(8.dp))

      Text(
        text = "Composite 12-part procedural 3D model with realistic ACES Filmic tone mapping, metalness/roughness reflections, and real-time gemstone dispersion.",
        fontFamily = MontserratFontFamily,
        fontSize = 12.sp,
        lineHeight = 18.sp,
        color = AtelierNeutralForeground,
        textAlign = TextAlign.Center
      )

      Spacer(modifier = Modifier.height(16.dp))

      AtelierPrimaryButton(
        text = "LAUNCH 3D RIVA STUDIO",
        onClick = onOpenStudio3D,
        modifier = Modifier.fillMaxWidth(),
        testTag = "launch_3d_studio_button"
      )
    }
  }
}

@Composable
fun CategoryFilterRow(
  selectedCategory: JewelryCategory,
  onSelectCategory: (JewelryCategory) -> Unit,
  modifier: Modifier = Modifier
) {
  Row(
    modifier = modifier
      .fillMaxWidth()
      .background(AtelierSurface)
      .horizontalScroll(rememberScrollState())
      .padding(horizontal = 16.dp, vertical = 12.dp),
    horizontalArrangement = Arrangement.spacedBy(10.dp)
  ) {
    JewelryCategory.values().forEach { category ->
      val isSelected = category == selectedCategory
      Surface(
        shape = RoundedCornerShape(2.dp),
        color = if (isSelected) AtelierTertiary else AtelierSurfaceContainerLowest,
        border = BorderStroke(1.dp, if (isSelected) AtelierTertiary else AtelierHairline),
        modifier = Modifier
          .clickable { onSelectCategory(category) }
          .testTag("category_chip_${category.name}")
      ) {
        Text(
          text = category.displayName.uppercase(Locale.ROOT),
          fontFamily = MontserratFontFamily,
          fontWeight = if (isSelected) FontWeight.Medium else FontWeight.Normal,
          fontSize = 10.sp,
          letterSpacing = 1.5.sp,
          color = if (isSelected) AtelierOnTertiary else AtelierOnSurface,
          modifier = Modifier.padding(horizontal = 14.dp, vertical = 8.dp)
        )
      }
    }
  }
}

@Composable
fun EditorialCraftStorySection(
  onOpenConsultation: () -> Unit,
  modifier: Modifier = Modifier
) {
  Surface(
    shape = RoundedCornerShape(2.dp),
    color = AtelierSurfaceContainerLowest,
    border = BorderStroke(1.dp, AtelierHairline),
    modifier = modifier
      .fillMaxWidth()
      .padding(horizontal = 12.dp, vertical = 16.dp)
  ) {
    Column(
      modifier = Modifier.padding(20.dp)
    ) {
      Row(verticalAlignment = Alignment.CenterVertically) {
        Icon(
          imageVector = Icons.Outlined.AutoAwesome,
          contentDescription = null,
          tint = AtelierSecondaryGold,
          modifier = Modifier.size(18.dp)
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text(
          text = "HERITAGE & CRAFTSMANSHIP",
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 10.sp,
          letterSpacing = 1.8.sp,
          color = AtelierPrimaryRoseTaupe
        )
      }

      Spacer(modifier = Modifier.height(8.dp))

      Text(
        text = "Ancestral Lost-Wax Casting & Master Benchwork",
        fontFamily = PlayfairDisplayFontFamily,
        fontSize = 20.sp,
        lineHeight = 26.sp,
        color = AtelierOnSurface
      )

      Spacer(modifier = Modifier.height(10.dp))

      AsyncImage(
        model = "https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=1000&q=80",
        contentDescription = "Artisan at the bench",
        contentScale = ContentScale.Crop,
        modifier = Modifier
          .fillMaxWidth()
          .height(170.dp)
          .clip(RoundedCornerShape(2.dp))
      )

      Spacer(modifier = Modifier.height(12.dp))

      Text(
        text = "Each ring, necklace, and bangle begins with hand-carved jeweler's wax, cast in certified BIS hallmarked 18-karat gold or dense 950 platinum. Every diamond is conflict-free, hand-examined under 40x magnification, and set into low-profile comfort baskets.",
        fontFamily = MontserratFontFamily,
        fontSize = 12.sp,
        lineHeight = 19.sp,
        color = AtelierNeutralForeground
      )

      Spacer(modifier = Modifier.height(16.dp))

      AtelierSecondaryButton(
        text = "REQUEST BESPOKE COMMISSIONS",
        onClick = onOpenConsultation,
        modifier = Modifier.fillMaxWidth()
      )
    }
  }
}

@Composable
fun AtelierConsultationBanner(
  onOpenConsultation: () -> Unit,
  modifier: Modifier = Modifier
) {
  Card(
    shape = RoundedCornerShape(2.dp),
    colors = CardDefaults.cardColors(containerColor = AtelierTertiary),
    modifier = modifier
      .fillMaxWidth()
      .padding(horizontal = 12.dp, vertical = 8.dp)
  ) {
    Column(
      modifier = Modifier.padding(24.dp),
      horizontalAlignment = Alignment.CenterHorizontally
    ) {
      Icon(
        imageVector = Icons.Outlined.CalendarMonth,
        contentDescription = null,
        tint = AtelierSecondaryGold,
        modifier = Modifier.size(32.dp)
      )

      Spacer(modifier = Modifier.height(12.dp))

      Text(
        text = "PRIVATE APPOINTMENT",
        fontFamily = MontserratFontFamily,
        fontWeight = FontWeight.Medium,
        fontSize = 10.sp,
        letterSpacing = 2.sp,
        color = AtelierSecondaryGold
      )

      Spacer(modifier = Modifier.height(6.dp))

      Text(
        text = "Consult with our Master Gemologist",
        fontFamily = PlayfairDisplayFontFamily,
        fontSize = 20.sp,
        color = Color.White,
        textAlign = TextAlign.Center
      )

      Spacer(modifier = Modifier.height(8.dp))

      Text(
        text = "Available at our Mumbai (Bandra), New Delhi (South Ex), Bengaluru salons, or via Virtual Private Salon worldwide.",
        fontFamily = MontserratFontFamily,
        fontSize = 12.sp,
        lineHeight = 18.sp,
        color = AtelierSurface.copy(alpha = 0.8f),
        textAlign = TextAlign.Center
      )

      Spacer(modifier = Modifier.height(18.dp))

      AtelierPrimaryButton(
        text = "BOOK PRIVATE SALON",
        onClick = onOpenConsultation,
        modifier = Modifier.fillMaxWidth(),
        testTag = "book_consultation_home_button"
      )
    }
  }
}
