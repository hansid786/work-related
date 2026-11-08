package com.example.ui.dialogs

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material.icons.outlined.Diamond
import androidx.compose.material.icons.outlined.LocalShipping
import androidx.compose.material.icons.outlined.Lock
import androidx.compose.material.icons.outlined.Verified
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Slider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
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
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import coil.compose.AsyncImage
import com.example.model.CartItem
import com.example.ui.components.AtelierPrimaryButton
import com.example.ui.components.AtelierSecondaryButton
import com.example.ui.theme.AtelierBackground
import com.example.ui.theme.AtelierGoldAccent
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
fun CartDrawerDialog(
  isOpen: Boolean,
  cartItems: List<CartItem>,
  onClose: () -> Unit,
  onUpdateQty: (String, Int) -> Unit,
  onRemoveItem: (String) -> Unit,
  onProceedToCheckout: () -> Unit
) {
  if (!isOpen) return

  val currencyFormat = NumberFormat.getCurrencyInstance(Locale("en", "IN")).apply {
    maximumFractionDigits = 0
  }
  val subtotal = cartItems.sumOf { it.totalPrice }

  Dialog(
    onDismissRequest = onClose,
    properties = DialogProperties(usePlatformDefaultWidth = false)
  ) {
    Box(
      modifier = Modifier
        .fillMaxSize()
        .background(Color.Black.copy(alpha = 0.45f))
        .clickable(onClick = onClose)
    ) {
      Surface(
        modifier = Modifier
          .fillMaxHeight()
          .fillMaxWidth(0.92f)
          .align(Alignment.CenterEnd)
          .clickable(enabled = false) {}
          .testTag("cart_drawer"),
        color = AtelierSurface,
        shape = RoundedCornerShape(topStart = 4.dp, bottomStart = 4.dp)
      ) {
        Column(
          modifier = Modifier
            .fillMaxSize()
            .padding(20.dp)
        ) {
          // Header
          Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
          ) {
            Column {
              Text(
                text = "SHOPPING BAG",
                fontFamily = PlayfairDisplayFontFamily,
                fontWeight = FontWeight.Medium,
                fontSize = 18.sp,
                letterSpacing = 2.sp,
                color = AtelierOnSurface
              )
              Text(
                text = "${cartItems.sumOf { it.quantity }} Curated Pieces",
                fontFamily = MontserratFontFamily,
                fontSize = 11.sp,
                letterSpacing = 1.sp,
                color = AtelierNeutralForeground
              )
            }

            IconButton(
              onClick = onClose,
              modifier = Modifier.testTag("close_cart_button")
            ) {
              Icon(
                imageVector = Icons.Default.Close,
                contentDescription = "Close Shopping Bag",
                tint = AtelierOnSurface
              )
            }
          }

          HorizontalDivider(
            thickness = 1.dp,
            color = AtelierHairline,
            modifier = Modifier.padding(vertical = 12.dp)
          )

          if (cartItems.isEmpty()) {
            Column(
              modifier = Modifier
                .weight(1f)
                .fillMaxWidth(),
              horizontalAlignment = Alignment.CenterHorizontally,
              verticalArrangement = Arrangement.Center
            ) {
              Icon(
                imageVector = Icons.Outlined.Diamond,
                contentDescription = null,
                tint = AtelierSecondaryGold,
                modifier = Modifier.size(48.dp)
              )
              Spacer(modifier = Modifier.height(16.dp))
              Text(
                text = "Your jewelry drawer is empty.",
                fontFamily = PlayfairDisplayFontFamily,
                fontSize = 18.sp,
                color = AtelierOnSurface
              )
              Spacer(modifier = Modifier.height(8.dp))
              Text(
                text = "Discover our handcrafted monographs and bespoke creations.",
                fontFamily = MontserratFontFamily,
                fontSize = 12.sp,
                color = AtelierNeutralForeground,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(horizontal = 24.dp)
              )
            }
          } else {
            LazyColumn(
              modifier = Modifier
                .weight(1f)
                .fillMaxWidth(),
              verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
              items(cartItems, key = { it.cartId }) { item ->
                CartItemRow(
                  cartItem = item,
                  onUpdateQty = { newQty -> onUpdateQty(item.cartId, newQty) },
                  onRemove = { onRemoveItem(item.cartId) }
                )
              }

              item {
                // Complimentary services note
                Card(
                  shape = RoundedCornerShape(2.dp),
                  colors = CardDefaults.cardColors(containerColor = AtelierGoldBadgeBg),
                  border = BorderStroke(1.dp, AtelierHairline),
                  modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp)
                ) {
                  Column(modifier = Modifier.padding(14.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                      Icon(
                        imageVector = Icons.Outlined.Verified,
                        contentDescription = null,
                        tint = AtelierPrimaryRoseTaupe,
                        modifier = Modifier.size(16.dp)
                      )
                      Spacer(modifier = Modifier.width(8.dp))
                      Text(
                        text = "ATELIER COMPLIMENTARY SERVICES",
                        fontFamily = MontserratFontFamily,
                        fontWeight = FontWeight.Medium,
                        fontSize = 10.sp,
                        letterSpacing = 1.4.sp,
                        color = AtelierPrimaryRoseTaupe
                      )
                    }
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                      text = "• Hand-waxed monogram presentation box\n• White-glove insured courier\n• 30-day bespoke complimentary sizing",
                      fontFamily = MontserratFontFamily,
                      fontSize = 11.sp,
                      lineHeight = 16.sp,
                      color = AtelierNeutralForeground
                    )
                  }
                }
              }
            }

            // Summary & Checkout
            Column(
              modifier = Modifier
                .fillMaxWidth()
                .padding(top = 12.dp)
            ) {
              HorizontalDivider(thickness = 1.dp, color = AtelierHairline)
              Spacer(modifier = Modifier.height(12.dp))

              Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
              ) {
                Text(
                  text = "Subtotal",
                  fontFamily = MontserratFontFamily,
                  fontSize = 13.sp,
                  color = AtelierNeutralForeground
                )
                Text(
                  text = currencyFormat.format(subtotal),
                  fontFamily = MontserratFontFamily,
                  fontWeight = FontWeight.Medium,
                  fontSize = 14.sp,
                  color = AtelierOnSurface
                )
              }

              Spacer(modifier = Modifier.height(4.dp))

              Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
              ) {
                Text(
                  text = "Insured White-Glove Courier",
                  fontFamily = MontserratFontFamily,
                  fontSize = 13.sp,
                  color = AtelierNeutralForeground
                )
                Text(
                  text = "Complimentary",
                  fontFamily = MontserratFontFamily,
                  fontWeight = FontWeight.Medium,
                  fontSize = 12.sp,
                  letterSpacing = 1.sp,
                  color = AtelierPrimaryRoseTaupe
                )
              }

              Spacer(modifier = Modifier.height(14.dp))

              Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
              ) {
                Text(
                  text = "TOTAL",
                  fontFamily = MontserratFontFamily,
                  fontWeight = FontWeight.SemiBold,
                  fontSize = 13.sp,
                  letterSpacing = 2.sp,
                  color = AtelierOnSurface
                )
                Text(
                  text = currencyFormat.format(subtotal),
                  fontFamily = PlayfairDisplayFontFamily,
                  fontWeight = FontWeight.Medium,
                  fontSize = 20.sp,
                  color = AtelierTertiary
                )
              }

              Spacer(modifier = Modifier.height(16.dp))

              AtelierPrimaryButton(
                text = "PROCEED TO CHECKOUT",
                onClick = onProceedToCheckout,
                modifier = Modifier.fillMaxWidth(),
                testTag = "checkout_button"
              )
            }
          }
        }
      }
    }
  }
}

@Composable
fun CartItemRow(
  cartItem: CartItem,
  onUpdateQty: (Int) -> Unit,
  onRemove: () -> Unit
) {
  val currencyFormat = NumberFormat.getCurrencyInstance(Locale("en", "IN")).apply {
    maximumFractionDigits = 0
  }

  Surface(
    shape = RoundedCornerShape(2.dp),
    color = AtelierSurfaceContainerLowest,
    border = BorderStroke(1.dp, AtelierHairline),
    modifier = Modifier.fillMaxWidth()
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(10.dp),
      verticalAlignment = Alignment.CenterVertically
    ) {
      AsyncImage(
        model = cartItem.item.images.firstOrNull(),
        contentDescription = cartItem.item.title,
        contentScale = ContentScale.Crop,
        modifier = Modifier
          .size(68.dp)
          .clip(RoundedCornerShape(2.dp))
          .background(AtelierSurface)
      )

      Spacer(modifier = Modifier.width(12.dp))

      Column(
        modifier = Modifier.weight(1f)
      ) {
        Text(
          text = cartItem.item.title,
          fontFamily = PlayfairDisplayFontFamily,
          fontSize = 14.sp,
          color = AtelierOnSurface
        )

        Text(
          text = cartItem.selectedMetal.name + if (cartItem.selectedSize != null) " • Size ${cartItem.selectedSize}" else "",
          fontFamily = MontserratFontFamily,
          fontSize = 11.sp,
          color = AtelierNeutralForeground
        )

        if (cartItem.engravingText.isNotBlank()) {
          Text(
            text = "Engraving: \"${cartItem.engravingText}\"",
            fontFamily = MontserratFontFamily,
            fontSize = 10.sp,
            color = AtelierPrimaryRoseTaupe
          )
        }

        Spacer(modifier = Modifier.height(4.dp))

        Text(
          text = currencyFormat.format(cartItem.totalPrice),
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 13.sp,
          color = AtelierTertiary
        )

        Spacer(modifier = Modifier.height(6.dp))

        Row(
          verticalAlignment = Alignment.CenterVertically,
          horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
          Box(
            modifier = Modifier
              .size(24.dp)
              .border(1.dp, AtelierHairline, RoundedCornerShape(2.dp))
              .clickable { onUpdateQty(cartItem.quantity - 1) },
            contentAlignment = Alignment.Center
          ) {
            Icon(
              imageVector = Icons.Default.Remove,
              contentDescription = "Decrease",
              modifier = Modifier.size(12.dp),
              tint = AtelierOnSurface
            )
          }

          Text(
            text = cartItem.quantity.toString(),
            fontFamily = MontserratFontFamily,
            fontSize = 12.sp,
            color = AtelierOnSurface
          )

          Box(
            modifier = Modifier
              .size(24.dp)
              .border(1.dp, AtelierHairline, RoundedCornerShape(2.dp))
              .clickable { onUpdateQty(cartItem.quantity + 1) },
            contentAlignment = Alignment.Center
          ) {
            Icon(
              imageVector = Icons.Default.Add,
              contentDescription = "Increase",
              modifier = Modifier.size(12.dp),
              tint = AtelierOnSurface
            )
          }
        }
      }

      IconButton(
        onClick = onRemove,
        modifier = Modifier.size(32.dp)
      ) {
        Icon(
          imageVector = Icons.Default.Delete,
          contentDescription = "Remove Item",
          tint = AtelierNeutralForeground,
          modifier = Modifier.size(16.dp)
        )
      }
    }
  }
}

@Composable
fun CheckoutDialog(
  isOpen: Boolean,
  totalAmount: Double,
  onDismiss: () -> Unit,
  onConfirmOrder: (String, String) -> Unit
) {
  if (!isOpen) return

  var fullName by remember { mutableStateOf("Ananya Singhania") }
  var address by remember { mutableStateOf("42 Pali Hill Road, Bandra West") }
  var city by remember { mutableStateOf("Mumbai, Maharashtra 400050") }
  var giftNote by remember { mutableStateOf("Celebrating our timeless love and eternity.") }
  var selectedPayment by remember { mutableStateOf("Riva Jewels Concierge Delivery & Payment") }

  val currencyFormat = NumberFormat.getCurrencyInstance(Locale("en", "IN")).apply {
    maximumFractionDigits = 0
  }

  Dialog(onDismissRequest = onDismiss) {
    Surface(
      shape = RoundedCornerShape(2.dp),
      color = AtelierSurface,
      border = BorderStroke(1.dp, AtelierHairline),
      modifier = Modifier
        .fillMaxWidth()
        .padding(12.dp)
    ) {
      Column(
        modifier = Modifier
          .fillMaxWidth()
          .padding(20.dp)
          .verticalScroll(rememberScrollState())
      ) {
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Column {
            Text(
              text = "ATELIER CHECKOUT",
              fontFamily = PlayfairDisplayFontFamily,
              fontSize = 18.sp,
              letterSpacing = 2.sp,
              color = AtelierOnSurface
            )
            Text(
              text = "Bespoke White-Glove Acquisition",
              fontFamily = MontserratFontFamily,
              fontSize = 11.sp,
              color = AtelierNeutralForeground
            )
          }
          IconButton(onClick = onDismiss) {
            Icon(Icons.Default.Close, contentDescription = "Close")
          }
        }

        HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp), color = AtelierHairline)

        Text(
          text = "DELIVERY DESTINATION",
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 10.sp,
          letterSpacing = 1.8.sp,
          color = AtelierPrimaryRoseTaupe
        )

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
          value = fullName,
          onValueChange = { fullName = it },
          label = { Text("Client Full Name", fontFamily = MontserratFontFamily, fontSize = 12.sp) },
          singleLine = true,
          modifier = Modifier.fillMaxWidth(),
          colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = AtelierTertiary,
            unfocusedBorderColor = AtelierHairline
          )
        )

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
          value = address,
          onValueChange = { address = it },
          label = { Text("Private Address", fontFamily = MontserratFontFamily, fontSize = 12.sp) },
          singleLine = true,
          modifier = Modifier.fillMaxWidth(),
          colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = AtelierTertiary,
            unfocusedBorderColor = AtelierHairline
          )
        )

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
          value = city,
          onValueChange = { city = it },
          label = { Text("City & Postal Code", fontFamily = MontserratFontFamily, fontSize = 12.sp) },
          singleLine = true,
          modifier = Modifier.fillMaxWidth(),
          colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = AtelierTertiary,
            unfocusedBorderColor = AtelierHairline
          )
        )

        Spacer(modifier = Modifier.height(14.dp))

        Text(
          text = "CALLIGRAPHED GIFT ENCLOSURE",
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 10.sp,
          letterSpacing = 1.8.sp,
          color = AtelierPrimaryRoseTaupe
        )

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
          value = giftNote,
          onValueChange = { giftNote = it },
          label = { Text("Handwritten Calligraphy Card Note", fontFamily = MontserratFontFamily, fontSize = 12.sp) },
          maxLines = 3,
          modifier = Modifier.fillMaxWidth(),
          colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = AtelierTertiary,
            unfocusedBorderColor = AtelierHairline
          )
        )

        Spacer(modifier = Modifier.height(16.dp))

        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Text(
            text = "Total Investment:",
            fontFamily = MontserratFontFamily,
            fontSize = 13.sp,
            color = AtelierNeutralForeground
          )
          Text(
            text = currencyFormat.format(totalAmount),
            fontFamily = PlayfairDisplayFontFamily,
            fontSize = 20.sp,
            fontWeight = FontWeight.Medium,
            color = AtelierTertiary
          )
        }

        Spacer(modifier = Modifier.height(16.dp))

        AtelierPrimaryButton(
          text = "CONFIRM & DISPATCH ORDER",
          onClick = { onConfirmOrder(fullName, address) },
          modifier = Modifier.fillMaxWidth(),
          testTag = "confirm_order_button"
        )
      }
    }
  }
}

@Composable
fun OrderConfirmationDialog(
  orderNumber: String?,
  onDismiss: () -> Unit
) {
  if (orderNumber == null) return

  Dialog(onDismissRequest = onDismiss) {
    Surface(
      shape = RoundedCornerShape(2.dp),
      color = AtelierSurface,
      border = BorderStroke(1.dp, AtelierGoldBadgeBorder),
      modifier = Modifier
        .fillMaxWidth()
        .padding(16.dp)
    ) {
      Column(
        modifier = Modifier
          .fillMaxWidth()
          .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally
      ) {
        Box(
          modifier = Modifier
            .size(54.dp)
            .clip(CircleShape)
            .background(AtelierGoldBadgeBg)
            .border(1.dp, AtelierSecondaryGold, CircleShape),
          contentAlignment = Alignment.Center
        ) {
          Icon(
            imageVector = Icons.Default.Check,
            contentDescription = null,
            tint = AtelierPrimaryRoseTaupe,
            modifier = Modifier.size(28.dp)
          )
        }

        Spacer(modifier = Modifier.height(16.dp))

        Text(
          text = "COMMISSION CONFIRMED",
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 11.sp,
          letterSpacing = 2.sp,
          color = AtelierPrimaryRoseTaupe
        )

        Spacer(modifier = Modifier.height(6.dp))

        Text(
          text = "Order $orderNumber",
          fontFamily = PlayfairDisplayFontFamily,
          fontSize = 22.sp,
          color = AtelierOnSurface
        )

        Spacer(modifier = Modifier.height(12.dp))

        Text(
          text = "Our Parisian master jewelers have commenced preparing your pieces. Your presentation suite is enclosed in a velvet monograph case and dispatched via insured private courier.",
          fontFamily = MontserratFontFamily,
          fontSize = 13.sp,
          lineHeight = 20.sp,
          textAlign = TextAlign.Center,
          color = AtelierNeutralForeground
        )

        Spacer(modifier = Modifier.height(20.dp))

        AtelierPrimaryButton(
          text = "RETURN TO CATALOGUE",
          onClick = onDismiss,
          modifier = Modifier.fillMaxWidth()
        )
      }
    }
  }
}

@Composable
fun ConsultationBookingDialog(
  isOpen: Boolean,
  onDismiss: () -> Unit,
  onBook: (name: String, email: String, phone: String, salon: String, date: String, time: String, notes: String) -> Unit
) {
  if (!isOpen) return

  var name by remember { mutableStateOf("") }
  var email by remember { mutableStateOf("") }
  var phone by remember { mutableStateOf("") }
  var selectedSalon by remember { mutableStateOf("Flagship Salon — Mumbai (Bandra West)") }
  var selectedDate by remember { mutableStateOf("Thursday, Nov 12") }
  var selectedTime by remember { mutableStateOf("14:00 IST") }
  var notes by remember { mutableStateOf("") }

  val salonOptions = listOf(
    "Flagship Salon — Mumbai (Bandra West)",
    "Heritage Salon — New Delhi (South Ex)",
    "Luxury Salon — Bengaluru (Lavelle Rd)",
    "Private Virtual Salon (Worldwide)"
  )

  Dialog(onDismissRequest = onDismiss) {
    Surface(
      shape = RoundedCornerShape(2.dp),
      color = AtelierSurface,
      border = BorderStroke(1.dp, AtelierHairline),
      modifier = Modifier
        .fillMaxWidth()
        .padding(12.dp)
    ) {
      Column(
        modifier = Modifier
          .fillMaxWidth()
          .padding(20.dp)
          .verticalScroll(rememberScrollState())
      ) {
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Column {
            Text(
              text = "PRIVATE CONSULTATION",
              fontFamily = PlayfairDisplayFontFamily,
              fontSize = 18.sp,
              letterSpacing = 2.sp,
              color = AtelierOnSurface
            )
            Text(
              text = "Meet with our Master Gemologist",
              fontFamily = MontserratFontFamily,
              fontSize = 11.sp,
              color = AtelierNeutralForeground
            )
          }
          IconButton(onClick = onDismiss) {
            Icon(Icons.Default.Close, contentDescription = "Close")
          }
        }

        HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp), color = AtelierHairline)

        Text(
          text = "SELECT ATELIER SALON",
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 10.sp,
          letterSpacing = 1.6.sp,
          color = AtelierPrimaryRoseTaupe
        )

        Spacer(modifier = Modifier.height(8.dp))

        salonOptions.forEach { salon ->
          val isSelected = salon == selectedSalon
          Row(
            modifier = Modifier
              .fillMaxWidth()
              .padding(vertical = 4.dp)
              .clip(RoundedCornerShape(2.dp))
              .background(if (isSelected) AtelierTertiary else AtelierSurfaceContainerLowest)
              .border(1.dp, if (isSelected) AtelierTertiary else AtelierHairline, RoundedCornerShape(2.dp))
              .clickable { selectedSalon = salon }
              .padding(horizontal = 12.dp, vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically
          ) {
            Text(
              text = salon,
              fontFamily = MontserratFontFamily,
              fontWeight = if (isSelected) FontWeight.Medium else FontWeight.Normal,
              fontSize = 12.sp,
              color = if (isSelected) AtelierOnTertiary else AtelierOnSurface
            )
          }
        }

        Spacer(modifier = Modifier.height(14.dp))

        Text(
          text = "CLIENT PARTICULARS",
          fontFamily = MontserratFontFamily,
          fontWeight = FontWeight.Medium,
          fontSize = 10.sp,
          letterSpacing = 1.6.sp,
          color = AtelierPrimaryRoseTaupe
        )

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
          value = name,
          onValueChange = { name = it },
          label = { Text("Your Full Name", fontFamily = MontserratFontFamily, fontSize = 12.sp) },
          singleLine = true,
          modifier = Modifier.fillMaxWidth().testTag("client_name_input"),
          colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = AtelierTertiary,
            unfocusedBorderColor = AtelierHairline
          )
        )

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
          value = email,
          onValueChange = { email = it },
          label = { Text("Email Address", fontFamily = MontserratFontFamily, fontSize = 12.sp) },
          singleLine = true,
          modifier = Modifier.fillMaxWidth(),
          colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = AtelierTertiary,
            unfocusedBorderColor = AtelierHairline
          )
        )

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
          value = phone,
          onValueChange = { phone = it },
          label = { Text("Telephone", fontFamily = MontserratFontFamily, fontSize = 12.sp) },
          singleLine = true,
          modifier = Modifier.fillMaxWidth(),
          colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = AtelierTertiary,
            unfocusedBorderColor = AtelierHairline
          )
        )

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
          value = notes,
          onValueChange = { notes = it },
          label = { Text("Bespoke Inquiries / Stone Preference", fontFamily = MontserratFontFamily, fontSize = 12.sp) },
          maxLines = 3,
          modifier = Modifier.fillMaxWidth(),
          colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = AtelierTertiary,
            unfocusedBorderColor = AtelierHairline
          )
        )

        Spacer(modifier = Modifier.height(18.dp))

        AtelierPrimaryButton(
          text = "CONFIRM ATELIER APPOINTMENT",
          onClick = {
            val clientName = if (name.isBlank()) "Distinguished Guest" else name
            val clientEmail = if (email.isBlank()) "guest@atelier.com" else email
            val clientPhone = if (phone.isBlank()) "+33 1 42 68 00 00" else phone
            onBook(clientName, clientEmail, clientPhone, selectedSalon, selectedDate, selectedTime, notes)
          },
          modifier = Modifier.fillMaxWidth(),
          testTag = "book_appointment_submit"
        )
      }
    }
  }
}

@Composable
fun InteractiveRingSizerDialog(
  isOpen: Boolean,
  onDismiss: () -> Unit
) {
  if (!isOpen) return

  var ringDiameterMm by remember { mutableFloatStateOf(16.5f) } // corresponds to US 6.0

  val calculatedUsSize = when {
    ringDiameterMm < 15.3f -> 4.5
    ringDiameterMm < 15.7f -> 5.0
    ringDiameterMm < 16.1f -> 5.5
    ringDiameterMm < 16.5f -> 6.0
    ringDiameterMm < 16.9f -> 6.5
    ringDiameterMm < 17.3f -> 7.0
    ringDiameterMm < 17.7f -> 7.5
    ringDiameterMm < 18.2f -> 8.0
    ringDiameterMm < 18.6f -> 8.5
    ringDiameterMm < 19.0f -> 9.0
    else -> 9.5
  }

  val circumferenceMm = (ringDiameterMm * Math.PI).toFloat()

  Dialog(onDismissRequest = onDismiss) {
    Surface(
      shape = RoundedCornerShape(2.dp),
      color = AtelierSurface,
      border = BorderStroke(1.dp, AtelierHairline),
      modifier = Modifier
        .fillMaxWidth()
        .padding(12.dp)
    ) {
      Column(
        modifier = Modifier
          .fillMaxWidth()
          .padding(20.dp)
          .verticalScroll(rememberScrollState()),
        horizontalAlignment = Alignment.CenterHorizontally
      ) {
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Column {
            Text(
              text = "RING CALIPER & GUIDE",
              fontFamily = PlayfairDisplayFontFamily,
              fontSize = 18.sp,
              letterSpacing = 2.sp,
              color = AtelierOnSurface
            )
            Text(
              text = "Calibrate against an existing ring",
              fontFamily = MontserratFontFamily,
              fontSize = 11.sp,
              color = AtelierNeutralForeground
            )
          }
          IconButton(onClick = onDismiss) {
            Icon(Icons.Default.Close, contentDescription = "Close")
          }
        }

        HorizontalDivider(modifier = Modifier.padding(vertical = 12.dp), color = AtelierHairline)

        Text(
          text = "Place your ring on the circle below and adjust the slider until the golden circle aligns precisely with the inside edge of your ring band.",
          fontFamily = MontserratFontFamily,
          fontSize = 12.sp,
          lineHeight = 18.sp,
          color = AtelierNeutralForeground,
          textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Ring Caliper circle visualization
        val displaySizeDp = (ringDiameterMm * 7.5f).dp
        Box(
          modifier = Modifier
            .size(displaySizeDp)
            .border(2.dp, AtelierSecondaryGold, CircleShape)
            .background(AtelierGoldBadgeBg, CircleShape),
          contentAlignment = Alignment.Center
        ) {
          Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
              text = "US $calculatedUsSize",
              fontFamily = PlayfairDisplayFontFamily,
              fontWeight = FontWeight.Medium,
              fontSize = 18.sp,
              color = AtelierTertiary
            )
            Text(
              text = String.format(Locale.US, "%.1f mm", ringDiameterMm),
              fontFamily = MontserratFontFamily,
              fontSize = 11.sp,
              color = AtelierNeutralForeground
            )
          }
        }

        Spacer(modifier = Modifier.height(24.dp))

        Slider(
          value = ringDiameterMm,
          onValueChange = { ringDiameterMm = it },
          valueRange = 14.8f..20.0f,
          colors = SliderDefaults.colors(
            thumbColor = AtelierTertiary,
            activeTrackColor = AtelierSecondaryGold,
            inactiveTrackColor = AtelierHairline
          ),
          modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(14.dp))

        // Specs display table
        Surface(
          shape = RoundedCornerShape(2.dp),
          color = AtelierSurfaceContainerLowest,
          border = BorderStroke(1.dp, AtelierHairline),
          modifier = Modifier.fillMaxWidth()
        ) {
          Row(
            modifier = Modifier
              .fillMaxWidth()
              .padding(12.dp),
            horizontalArrangement = Arrangement.SpaceAround
          ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
              Text(
                text = "US / CA",
                fontFamily = MontserratFontFamily,
                fontWeight = FontWeight.Medium,
                fontSize = 10.sp,
                letterSpacing = 1.sp,
                color = AtelierNeutralForeground
              )
              Text(
                text = "$calculatedUsSize",
                fontFamily = PlayfairDisplayFontFamily,
                fontSize = 16.sp,
                color = AtelierTertiary
              )
            }

            Column(horizontalAlignment = Alignment.CenterHorizontally) {
              Text(
                text = "EU / ISO",
                fontFamily = MontserratFontFamily,
                fontWeight = FontWeight.Medium,
                fontSize = 10.sp,
                letterSpacing = 1.sp,
                color = AtelierNeutralForeground
              )
              Text(
                text = String.format(Locale.US, "%.1f", circumferenceMm),
                fontFamily = PlayfairDisplayFontFamily,
                fontSize = 16.sp,
                color = AtelierTertiary
              )
            }

            Column(horizontalAlignment = Alignment.CenterHorizontally) {
              Text(
                text = "DIAMETER",
                fontFamily = MontserratFontFamily,
                fontWeight = FontWeight.Medium,
                fontSize = 10.sp,
                letterSpacing = 1.sp,
                color = AtelierNeutralForeground
              )
              Text(
                text = String.format(Locale.US, "%.1f mm", ringDiameterMm),
                fontFamily = PlayfairDisplayFontFamily,
                fontSize = 16.sp,
                color = AtelierTertiary
              )
            }
          }
        }

        Spacer(modifier = Modifier.height(20.dp))

        AtelierPrimaryButton(
          text = "CONFIRM MY SIZE (US $calculatedUsSize)",
          onClick = onDismiss,
          modifier = Modifier.fillMaxWidth()
        )
      }
    }
  }
}
