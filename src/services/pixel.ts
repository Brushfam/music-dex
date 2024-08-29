declare global {
  interface Window {
    fbq: any;
  }
}

export function handleContactPixelEvent(contactName: string) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact", { contact_name: contactName });
  } else {
    console.error("Facebook Pixel is not initialized");
  }
}

export function handleInitCheckoutPixelEvent(
  ids: string[],
  contents: { id: string; quantity: number }
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "InitiateCheckout", {
      content_ids: ids,
      contents: [JSON.stringify(contents)],
    });
  } else {
    console.error("Facebook Pixel is not initialized");
  }
}

export function handleDonatePixelEvent(artist: string) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Donate", { artist });
  } else {
    console.error("Facebook Pixel is not initialized");
  }
}
