package com.example

import com.example.data.JewelryRepository
import com.example.model.ConsultationBooking
import com.example.model.JewelryCategory
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test

class AtelierUnitTest {

  @Before
  fun setup() {
    JewelryRepository.clearCart()
  }

  @Test
  fun catalog_hasCuratedPieces() {
    val catalog = JewelryRepository.sampleCatalog
    assertTrue(catalog.isNotEmpty())
    val solitaire = catalog.find { it.id == "item_solstice_ring" }
    assertNotNull(solitaire)
    assertEquals(JewelryCategory.RINGS, solitaire?.category)
  }

  @Test
  fun toggleFavorite_worksCorrectly() {
    val itemId = "item_aurelia_pendant"
    val initialStatus = JewelryRepository.favoriteIds.value.contains(itemId)
    JewelryRepository.toggleFavorite(itemId)
    assertEquals(!initialStatus, JewelryRepository.favoriteIds.value.contains(itemId))
    JewelryRepository.toggleFavorite(itemId)
    assertEquals(initialStatus, JewelryRepository.favoriteIds.value.contains(itemId))
  }

  @Test
  fun cart_addAndRemoveItem_calculatesTotal() {
    val item = JewelryRepository.sampleCatalog.first()
    val metal = item.metalOptions.first()
    JewelryRepository.addToCart(item, metal, 6.0, "Forever")

    val cart = JewelryRepository.cartItems.value
    assertEquals(1, cart.size)
    val cartItem = cart.first()
    assertEquals(item.id, cartItem.item.id)
    assertEquals(item.price + metal.priceAdjustment, cartItem.unitPrice, 0.01)

    // Increase quantity
    JewelryRepository.updateCartQuantity(cartItem.cartId, 2)
    assertEquals(2, JewelryRepository.cartItems.value.first().quantity)
    assertEquals(cartItem.unitPrice * 2, JewelryRepository.cartItems.value.first().totalPrice, 0.01)

    // Remove item
    JewelryRepository.removeCartItem(cartItem.cartId)
    assertTrue(JewelryRepository.cartItems.value.isEmpty())
  }

  @Test
  fun bookConsultation_savesBooking() {
    val booking = ConsultationBooking(
      id = "test_booking_1",
      clientName = "Victoria Sterling",
      email = "victoria@sterling.com",
      phone = "+1 212 555 0192",
      appointmentType = "Place Vendôme — Paris",
      date = "2026-11-15",
      time = "14:00",
      focusPieceOrNotes = "Solitaire oval ring inspection"
    )
    JewelryRepository.bookConsultation(booking)
    val bookings = JewelryRepository.consultations.value
    assertTrue(bookings.any { it.id == "test_booking_1" && it.clientName == "Victoria Sterling" })
  }
}
