package com.example.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.example.R

val PlayfairDisplayFontFamily = FontFamily(
  Font(R.font.playfair_display, FontWeight.Normal),
  Font(R.font.playfair_display, FontWeight.Medium),
  Font(R.font.playfair_display, FontWeight.Bold)
)

val MontserratFontFamily = FontFamily(
  Font(R.font.montserrat, FontWeight.Light),
  Font(R.font.montserrat, FontWeight.Normal),
  Font(R.font.montserrat, FontWeight.Medium),
  Font(R.font.montserrat, FontWeight.SemiBold)
)

// Material 3 Typography matching Atelier Minimalist Editorial Luxury Design System
val AtelierTypography = Typography(
  displayLarge = TextStyle(
    fontFamily = PlayfairDisplayFontFamily,
    fontWeight = FontWeight.Normal,
    fontSize = 38.sp,
    lineHeight = 46.sp,
    letterSpacing = (-0.5).sp
  ),
  displayMedium = TextStyle(
    fontFamily = PlayfairDisplayFontFamily,
    fontWeight = FontWeight.Normal,
    fontSize = 30.sp,
    lineHeight = 38.sp,
    letterSpacing = (-0.2).sp
  ),
  displaySmall = TextStyle(
    fontFamily = PlayfairDisplayFontFamily,
    fontWeight = FontWeight.Normal,
    fontSize = 24.sp,
    lineHeight = 32.sp,
    letterSpacing = 0.sp
  ),
  headlineLarge = TextStyle(
    fontFamily = PlayfairDisplayFontFamily,
    fontWeight = FontWeight.Normal,
    fontSize = 28.sp,
    lineHeight = 36.sp,
    letterSpacing = 0.sp
  ),
  headlineMedium = TextStyle(
    fontFamily = PlayfairDisplayFontFamily,
    fontWeight = FontWeight.Normal,
    fontSize = 22.sp,
    lineHeight = 30.sp,
    letterSpacing = 0.sp
  ),
  headlineSmall = TextStyle(
    fontFamily = PlayfairDisplayFontFamily,
    fontWeight = FontWeight.Medium,
    fontSize = 18.sp,
    lineHeight = 26.sp,
    letterSpacing = 0.2.sp
  ),
  titleLarge = TextStyle(
    fontFamily = PlayfairDisplayFontFamily,
    fontWeight = FontWeight.Medium,
    fontSize = 20.sp,
    lineHeight = 28.sp,
    letterSpacing = 0.sp
  ),
  titleMedium = TextStyle(
    fontFamily = MontserratFontFamily,
    fontWeight = FontWeight.Medium,
    fontSize = 15.sp,
    lineHeight = 22.sp,
    letterSpacing = 0.5.sp
  ),
  titleSmall = TextStyle(
    fontFamily = MontserratFontFamily,
    fontWeight = FontWeight.Medium,
    fontSize = 13.sp,
    lineHeight = 18.sp,
    letterSpacing = 0.5.sp
  ),
  bodyLarge = TextStyle(
    fontFamily = MontserratFontFamily,
    fontWeight = FontWeight.Light,
    fontSize = 15.sp,
    lineHeight = 24.sp,
    letterSpacing = 0.2.sp
  ),
  bodyMedium = TextStyle(
    fontFamily = MontserratFontFamily,
    fontWeight = FontWeight.Normal,
    fontSize = 14.sp,
    lineHeight = 22.sp,
    letterSpacing = 0.3.sp
  ),
  bodySmall = TextStyle(
    fontFamily = MontserratFontFamily,
    fontWeight = FontWeight.Normal,
    fontSize = 12.sp,
    lineHeight = 18.sp,
    letterSpacing = 0.3.sp
  ),
  labelLarge = TextStyle(
    fontFamily = MontserratFontFamily,
    fontWeight = FontWeight.Medium,
    fontSize = 13.sp,
    lineHeight = 18.sp,
    letterSpacing = 1.5.sp
  ),
  labelMedium = TextStyle(
    fontFamily = MontserratFontFamily,
    fontWeight = FontWeight.Medium,
    fontSize = 11.sp,
    lineHeight = 16.sp,
    letterSpacing = 1.8.sp
  ),
  labelSmall = TextStyle(
    fontFamily = MontserratFontFamily,
    fontWeight = FontWeight.Medium,
    fontSize = 10.sp,
    lineHeight = 14.sp,
    letterSpacing = 1.6.sp
  )
)
