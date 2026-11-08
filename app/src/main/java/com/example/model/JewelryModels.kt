package com.example.model

data class MetalOption(
  val id: String,
  val name: String,
  val karat: String,
  val colorHex: Long,
  val priceAdjustment: Double = 0.0
)

data class JewelryItem(
  val id: String,
  val title: String,
  val collection: String,
  val category: JewelryCategory,
  val subtitle: String,
  val metalPurity: String,
  val gemstoneSpecs: String,
  val price: Double,
  val images: List<String>,
  val description: String,
  val craftsmanshipStory: String,
  val badge: String? = null,
  val availableSizes: List<Double> = listOf(5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0),
  val metalOptions: List<MetalOption> = defaultMetals(),
  val allowsEngraving: Boolean = true,
  val inStock: Boolean = true
)

enum class JewelryCategory(val displayName: String) {
  ALL("All Collections"),
  RINGS("Rings & Solitaires"),
  NECKLACES("Necklaces & Pendants"),
  EARRINGS("Earrings"),
  BRACELETS("Bracelets"),
  BESPOKE("Bespoke High Jewelry")
}

data class CartItem(
  val cartId: String,
  val item: JewelryItem,
  val selectedMetal: MetalOption,
  val selectedSize: Double?,
  val engravingText: String = "",
  val quantity: Int = 1
) {
  val unitPrice: Double
    get() = item.price + selectedMetal.priceAdjustment

  val totalPrice: Double
    get() = unitPrice * quantity
}

data class ConsultationBooking(
  val id: String,
  val clientName: String,
  val email: String,
  val phone: String,
  val appointmentType: String, // "Virtual Concierge", "Place Vendôme - Paris", "Madison Ave - New York", "Bond St - London"
  val date: String,
  val time: String,
  val focusPieceOrNotes: String,
  val timestamp: Long = System.currentTimeMillis()
)

fun defaultMetals(): List<MetalOption> = listOf(
  MetalOption(
    id = "18k_yellow",
    name = "18K Yellow Gold",
    karat = "18K",
    colorHex = 0xFFD4AF37,
    priceAdjustment = 0.0
  ),
  MetalOption(
    id = "18k_rose",
    name = "18K Rose Gold",
    karat = "18K",
    colorHex = 0xFFB76E79,
    priceAdjustment = 50.0
  ),
  MetalOption(
    id = "platinum",
    name = "Platinum 950",
    karat = "Pt950",
    colorHex = 0xFFE5E4E2,
    priceAdjustment = 350.0
  ),
  MetalOption(
    id = "18k_white",
    name = "18K White Gold",
    karat = "18K",
    colorHex = 0xFFF2F3F4,
    priceAdjustment = 80.0
  )
)
