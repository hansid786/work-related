package com.example.data

import com.example.model.CartItem
import com.example.model.ConsultationBooking
import com.example.model.JewelryCategory
import com.example.model.JewelryItem
import com.example.model.MetalOption
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import java.util.UUID

object JewelryRepository {

  val sampleCatalog: List<JewelryItem> = listOf(
    JewelryItem(
      id = "item_solstice_ring",
      title = "The Solstice Solitaire",
      collection = "The Solstice Monograph",
      category = JewelryCategory.RINGS,
      subtitle = "1.75 ct Oval Diamond • Hand-Forged Bezel",
      metalPurity = "18K RECYCLED YELLOW GOLD",
      gemstoneSpecs = "1.75 ct Oval Cut • Color F • Clarity VVS1 • Excellent Polish & Symmetry",
      price = 6800.0,
      images = listOf(
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=1000&q=80"
      ),
      description = "The signature silhouette of our atelier. The Solstice embraces a hand-selected 1.75-carat oval diamond in a fluid, low-profile bezel setting designed for effortless daily elegance. Sculpted entirely by hand in our Parisian workshop.",
      craftsmanshipStory = "Forged using 100% recycled 18-karat gold with ancestral cold-forging techniques. Each setting is individually calibrated to the specific stone dimensions to ensure light enters unobstructed from every angle.",
      badge = "Signature Piece",
      availableSizes = listOf(4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5)
    ),
    JewelryItem(
      id = "item_larche_emerald",
      title = "L'Arche Emerald-Cut Ring",
      collection = "L'Arche High Jewelry",
      category = JewelryCategory.RINGS,
      subtitle = "2.20 ct Step-Cut • Tapered Platinum Basket",
      metalPurity = "PLATINUM 950",
      gemstoneSpecs = "2.20 ct Emerald Cut • Color E • Clarity VVS2 • GIA Certified",
      price = 9200.0,
      images = listOf(
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
      ),
      description = "Architectural restraint and pure geometry define L'Arche. Featuring an elongated emerald-cut center stone held aloft by four delicate double prongs over an open gallery gallery band.",
      craftsmanshipStory = "Cast in dense Platinum 950, renowned for its enduring luster and hypo-allergenic purity. Finished with a satin-brushed exterior and mirror-polished inner comfort-fit silhouette.",
      badge = "Bespoke",
      availableSizes = listOf(5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0)
    ),
    JewelryItem(
      id = "item_aurelia_pendant",
      title = "The Aurelia Medallion",
      collection = "Vendôme Classics",
      category = JewelryCategory.NECKLACES,
      subtitle = "Hammered 18K Gold • Star-Set Brilliant Diamond",
      metalPurity = "18K SOLID YELLOW GOLD",
      gemstoneSpecs = "0.15 ct Brilliant Cut Diamond Accent • Color G • Clarity VS1",
      price = 1850.0,
      images = listOf(
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
      ),
      description = "Inspired by ancient Grecian coinage unearthed in the Mediterranean basin. The Aurelia Medallion features an organic hand-hammered texture centered with a gypsy-set sparkling diamond on a 20-inch diamond-cut chain.",
      craftsmanshipStory = "Every disc is individually struck with custom steel dies and hand-carved at the bench, ensuring no two medallions bear identical textural impressions.",
      badge = "18K Solid Gold",
      availableSizes = emptyList(),
      allowsEngraving = true
    ),
    JewelryItem(
      id = "item_seraphina_earrings",
      title = "Seraphina Cascading Drops",
      collection = "High Jewelry Monograph",
      category = JewelryCategory.EARRINGS,
      subtitle = "1.80 ct Combined Diamonds • Articulated Movement",
      metalPurity = "PLATINUM 950 & 18K WHITE GOLD",
      gemstoneSpecs = "1.80 ct Total Diamonds • D-F Colorless • VVS Clarity",
      price = 4300.0,
      images = listOf(
        "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
      ),
      description = "Graceful kinetic drops designed to catch and refract ambient candlelight. Delicate articulated links connect a trio of descending bezel-set diamonds that sway softly with every gesture.",
      craftsmanshipStory = "Engineered with concealed platinum jump links for silent, fluid drape. Secured with hand-tensioned friction posts and oversized comfort backs.",
      badge = "Artisanal",
      availableSizes = emptyList(),
      allowsEngraving = false
    ),
    JewelryItem(
      id = "item_etoile_tennis",
      title = "Étoile Diamond Tennis Bracelet",
      collection = "Vendôme Classics",
      category = JewelryCategory.BRACELETS,
      subtitle = "4.50 ctw Pavé Continuum • Secret Atelier Clasp",
      metalPurity = "18K WHITE GOLD",
      gemstoneSpecs = "4.50 ct Total Weight • 56 Round Brilliant Diamonds • F Color • VS1",
      price = 7900.0,
      images = listOf(
        "https://images.unsplash.com/photo-1611591475168-96f7c132ce07?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
      ),
      description = "The pinnacle of fluid wristwear. 56 identically matched brilliant diamonds linked with four micro-prongs each. Seamlessly integrated hidden double-safety clasp.",
      craftsmanshipStory = "Gemologists screen over 1,000 stones to curate a single continuous progression of matching tables, depths, and refractive brilliance.",
      badge = "Heritage Icon",
      availableSizes = listOf(6.5, 7.0, 7.5),
      allowsEngraving = true
    ),
    JewelryItem(
      id = "item_signet_rose",
      title = "Signet de la Paix",
      collection = "Bespoke Monogram",
      category = JewelryCategory.RINGS,
      subtitle = "Heavy Solid 18K Gold • Hand-Chiseled Crest",
      metalPurity = "18K ROSE GOLD",
      gemstoneSpecs = "Solid Gold Seal • Optional Inside Secret Flush Ruby",
      price = 1950.0,
      images = listOf(
        "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
      ),
      description = "A substantial heirloom ring with a softly beveled oval table. Ready for bespoke monogram hand-engraving by our master engraver.",
      craftsmanshipStory = "Hand-poured solid gold billet weighed to precisely 14 grams. The face is hand-lapped on diamond paper to create an optical mirror flat surface.",
      badge = "Customizable",
      availableSizes = listOf(6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0),
      allowsEngraving = true
    ),
    JewelryItem(
      id = "item_ceylon_sapphire",
      title = "Le Saphir Royal Ring",
      collection = "Bespoke High Jewelry",
      category = JewelryCategory.BESPOKE,
      subtitle = "2.80 ct Unheated Ceylon Sapphire • Tapered Baguettes",
      metalPurity = "PLATINUM 950",
      gemstoneSpecs = "2.80 ct Royal Velvet Blue Sapphire • 0.60 ct Tapered Diamond Baguettes",
      price = 11500.0,
      images = listOf(
        "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
      ),
      description = "An extraordinary natural unheated royal blue sapphire sourced from the historic gem gravels of Ratnapura, flanked by crisp step-cut diamond baguettes.",
      craftsmanshipStory = "Accompanied by Gubelin and SSEF certificates affirming natural unheated origin. Setting hand-pierced with an open petal under-gallery.",
      badge = "One of a Kind",
      availableSizes = listOf(5.5, 6.0, 6.5, 7.0, 7.5),
      allowsEngraving = true
    ),
    JewelryItem(
      id = "item_vendome_chain",
      title = "Vendôme Rolo Collana",
      collection = "Vendôme Classics",
      category = JewelryCategory.NECKLACES,
      subtitle = "Handmade Hollow Links • 18K Yellow Gold",
      metalPurity = "18K RECYCLED YELLOW GOLD",
      gemstoneSpecs = "Pure Gold • Finished with Atelier Pavé Diamond Carabiner Clasp",
      price = 3200.0,
      images = listOf(
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
      ),
      description = "A bold yet featherweight chain of individual interlocking oval links, punctuated by our proprietary diamond-dusted screw carabiner lock.",
      craftsmanshipStory = "Constructed using seamless hydro-formed gold tubing to achieve dramatic volume and presence with unparalleled everyday comfort.",
      badge = "New Arrival",
      availableSizes = emptyList(),
      allowsEngraving = false
    )
  )

  // Wishlist / Favorites state
  private val _favoriteIds = MutableStateFlow<Set<String>>(setOf("item_solstice_ring", "item_etoile_tennis"))
  val favoriteIds: StateFlow<Set<String>> = _favoriteIds.asStateFlow()

  // Shopping Bag / Cart state
  private val _cartItems = MutableStateFlow<List<CartItem>>(
    listOf(
      CartItem(
        cartId = "cart_demo_1",
        item = sampleCatalog[0],
        selectedMetal = sampleCatalog[0].metalOptions[0],
        selectedSize = 6.0,
        engravingText = "Pour Toujours • A",
        quantity = 1
      )
    )
  )
  val cartItems: StateFlow<List<CartItem>> = _cartItems.asStateFlow()

  // Consultations state
  private val _consultations = MutableStateFlow<List<ConsultationBooking>>(emptyList())
  val consultations: StateFlow<List<ConsultationBooking>> = _consultations.asStateFlow()

  fun toggleFavorite(itemId: String) {
    _favoriteIds.update { current ->
      if (current.contains(itemId)) current - itemId else current + itemId
    }
  }

  fun addToCart(
    item: JewelryItem,
    metal: MetalOption,
    size: Double?,
    engraving: String
  ) {
    val existingIndex = _cartItems.value.indexOfFirst {
      it.item.id == item.id &&
          it.selectedMetal.id == metal.id &&
          it.selectedSize == size &&
          it.engravingText == engraving
    }

    if (existingIndex >= 0) {
      _cartItems.update { list ->
        list.toMutableList().apply {
          val current = this[existingIndex]
          this[existingIndex] = current.copy(quantity = current.quantity + 1)
        }
      }
    } else {
      val newItem = CartItem(
        cartId = UUID.randomUUID().toString(),
        item = item,
        selectedMetal = metal,
        selectedSize = size,
        engravingText = engraving,
        quantity = 1
      )
      _cartItems.update { it + newItem }
    }
  }

  fun updateCartQuantity(cartId: String, newQuantity: Int) {
    if (newQuantity <= 0) {
      removeCartItem(cartId)
    } else {
      _cartItems.update { list ->
        list.map { if (it.cartId == cartId) it.copy(quantity = newQuantity) else it }
      }
    }
  }

  fun removeCartItem(cartId: String) {
    _cartItems.update { list -> list.filterNot { it.cartId == cartId } }
  }

  fun clearCart() {
    _cartItems.value = emptyList()
  }

  fun bookConsultation(booking: ConsultationBooking) {
    _consultations.update { it + booking }
  }

  fun getItemById(id: String): JewelryItem? {
    return sampleCatalog.find { it.id == id }
  }
}
