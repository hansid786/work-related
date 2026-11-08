package com.example.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val AtelierLightColorScheme = lightColorScheme(
  primary = AtelierPrimary,
  onPrimary = AtelierOnPrimary,
  primaryContainer = AtelierPrimaryContainer,
  onPrimaryContainer = AtelierOnPrimaryContainer,
  secondary = AtelierSecondary,
  onSecondary = AtelierOnSecondary,
  secondaryContainer = AtelierSecondaryContainer,
  onSecondaryContainer = AtelierOnSecondaryContainer,
  tertiary = AtelierTertiary,
  onTertiary = AtelierOnTertiary,
  tertiaryContainer = AtelierTertiaryContainer,
  onTertiaryContainer = AtelierOnTertiaryContainer,
  background = AtelierBackground,
  onBackground = AtelierOnBackground,
  surface = AtelierSurface,
  onSurface = AtelierOnSurface,
  surfaceVariant = AtelierSurfaceContainerHigh,
  onSurfaceVariant = AtelierOnSurfaceVariant,
  outline = AtelierOutline,
  outlineVariant = AtelierOutlineVariant,
  surfaceContainerLowest = AtelierSurfaceContainerLowest,
  surfaceContainerLow = AtelierSurfaceContainerLow,
  surfaceContainer = AtelierSurfaceContainer,
  surfaceContainerHigh = AtelierSurfaceContainerHigh,
  surfaceContainerHighest = AtelierSurfaceContainerHighest
)

private val AtelierDarkColorScheme = darkColorScheme(
  primary = AtelierPrimaryRoseTaupe,
  onPrimary = AtelierTertiary,
  primaryContainer = AtelierPrimary,
  onPrimaryContainer = AtelierSurface,
  secondary = AtelierSecondaryGold,
  onSecondary = AtelierTertiary,
  secondaryContainer = AtelierSecondary,
  onSecondaryContainer = AtelierSecondaryContainer,
  tertiary = AtelierSecondaryGold,
  onTertiary = AtelierTertiary,
  background = AtelierTertiary,
  onBackground = AtelierSurface,
  surface = AtelierTertiary,
  onSurface = AtelierSurface,
  surfaceVariant = AtelierTertiaryContainer,
  onSurfaceVariant = AtelierHairline,
  outline = AtelierOutlineVariant,
  outlineVariant = AtelierHairlineTransparent,
  surfaceContainerLowest = AtelierTertiary,
  surfaceContainerLow = AtelierTertiaryContainer,
  surfaceContainer = AtelierTertiaryContainer,
  surfaceContainerHigh = AtelierPrimaryContainer,
  surfaceContainerHighest = AtelierOutline
)

@Composable
fun AtelierTheme(
  darkTheme: Boolean = isSystemInDarkTheme(),
  content: @Composable () -> Unit
) {
  // Always favor the curated Atelier luxury aesthetic (warm ivory gallery)
  val colorScheme = if (darkTheme) AtelierDarkColorScheme else AtelierLightColorScheme

  MaterialTheme(
    colorScheme = colorScheme,
    typography = AtelierTypography,
    content = content
  )
}
