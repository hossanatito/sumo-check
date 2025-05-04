"use server";

import type { Deal } from "@/types/deal";
import { z } from "zod";

const webhookUrl = "https://api.cynosurictechlabs.net/webhook/9fa81fc8-e3d9-43e9-b81c-ed719e406eff";

const UrlSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
});

interface FetchDealResult {
  success: boolean;
  data?: Deal[];
  error?: string;
}

export async function fetchDealInfo(prevState: FetchDealResult | null, formData: FormData): Promise<FetchDealResult> {
  const validatedFields = UrlSchema.safeParse({
    url: formData.get('url'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.errors.map((e) => e.message).join(', '),
    };
  }

  const { url } = validatedFields.data;

  try {
    console.log(`Fetching deal info for URL: ${url}`);
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }), // Send URL in the body as 'url'
       cache: 'no-store', // Ensure fresh data
    });

    console.log(`Webhook response status: ${response.status}`);


    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Webhook error response: ${errorText}`);
      throw new Error(`Webhook request failed: ${response.statusText} - ${errorText}`);
    }

    const data: Deal[] = await response.json();
    console.log("Webhook response data:", data);

    if (!Array.isArray(data)) {
       console.error("Webhook response is not an array:", data);
       throw new Error("Invalid response format received from webhook.");
    }


    // Basic validation of the first deal object structure
    if (data.length > 0) {
        const firstDeal = data[0];
        if (!firstDeal || typeof firstDeal["Deal Title"] !== 'string' || !Array.isArray(firstDeal.Plans)) {
            console.error("Webhook response structure is invalid:", firstDeal);
            throw new Error("Invalid deal structure received from webhook.");
        }
    }


    return { success: true, data };
  } catch (error) {
    console.error("Error fetching deal info:", error);
     const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, error: `Failed to fetch deal details: ${errorMessage}` };
  }
}
