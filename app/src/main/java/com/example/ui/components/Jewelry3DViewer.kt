package com.example.ui.components

import android.annotation.SuppressLint
import android.view.ViewGroup
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.outlined.ViewInAr
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.example.ui.theme.AtelierBackground
import com.example.ui.theme.AtelierOnTertiary
import com.example.ui.theme.AtelierSecondaryGold
import com.example.ui.theme.AtelierTertiary
import com.example.ui.theme.MontserratFontFamily
import com.example.ui.theme.PlayfairDisplayFontFamily

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun Jewelry3DViewer(
  selectedMetalId: String = "18k_yellow",
  selectedStone: String = "diamond",
  onClose: (() -> Unit)? = null,
  modifier: Modifier = Modifier
) {
  val context = LocalContext.current
  val webView = remember {
    WebView(context).apply {
      layoutParams = ViewGroup.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.MATCH_PARENT
      )
      settings.apply {
        javaScriptEnabled = true
        domStorageEnabled = true
        allowFileAccess = true
        allowContentAccess = true
        loadWithOverviewMode = true
        useWideViewPort = true
        cacheMode = WebSettings.LOAD_DEFAULT
      }
      webViewClient = object : WebViewClient() {
        override fun onPageFinished(view: WebView?, url: String?) {
          super.onPageFinished(view, url)
          view?.evaluateJavascript("window.setMetalFromAndroid('$selectedMetalId');", null)
          view?.evaluateJavascript("window.setStoneFromAndroid('$selectedStone');", null)
        }
      }
      loadUrl("file:///android_asset/jewelry_3d_viewer.html")
    }
  }

  // Update metal in 3D scene when changed from Compose state
  LaunchedEffect(selectedMetalId) {
    webView.evaluateJavascript("if (window.setMetalFromAndroid) { window.setMetalFromAndroid('$selectedMetalId'); }", null)
  }

  // Update stone in 3D scene when changed from Compose state
  LaunchedEffect(selectedStone) {
    webView.evaluateJavascript("if (window.setStoneFromAndroid) { window.setStoneFromAndroid('$selectedStone'); }", null)
  }

  DisposableEffect(Unit) {
    onDispose {
      webView.destroy()
    }
  }

  Box(
    modifier = modifier
      .fillMaxSize()
      .background(AtelierBackground)
      .testTag("threejs_jewelry_viewer")
  ) {
    AndroidView(
      factory = { webView },
      modifier = Modifier.fillMaxSize()
    )

    // Top Navigation & 3D Studio Title Bar
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(top = 16.dp, start = 16.dp, end = 16.dp),
      verticalAlignment = Alignment.CenterVertically
    ) {
      Surface(
        shape = CircleShape,
        color = AtelierTertiary.copy(alpha = 0.85f),
        modifier = Modifier.size(34.dp)
      ) {
        Box(contentAlignment = Alignment.Center) {
          Icon(
            imageVector = Icons.Outlined.ViewInAr,
            contentDescription = "3D Studio",
            tint = AtelierSecondaryGold,
            modifier = Modifier.size(18.dp)
          )
        }
      }

      Spacer(modifier = Modifier.width(10.dp))

      Surface(
        shape = CircleShape,
        color = AtelierTertiary.copy(alpha = 0.85f)
      ) {
        Row(
          modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
          verticalAlignment = Alignment.CenterVertically
        ) {
          Text(
            text = "3D ATELIER SALON",
            fontFamily = MontserratFontFamily,
            fontWeight = FontWeight.Medium,
            fontSize = 10.sp,
            letterSpacing = 1.6.sp,
            color = AtelierOnTertiary
          )
        }
      }

      Spacer(modifier = Modifier.weight(1f))

      if (onClose != null) {
        Surface(
          shape = CircleShape,
          color = AtelierTertiary.copy(alpha = 0.85f),
          modifier = Modifier.size(36.dp)
        ) {
          IconButton(
            onClick = onClose,
            modifier = Modifier.testTag("close_3d_viewer_button")
          ) {
            Icon(
              imageVector = Icons.Default.Close,
              contentDescription = "Close 3D View",
              tint = AtelierOnTertiary,
              modifier = Modifier.size(18.dp)
            )
          }
        }
      }
    }
  }
}
