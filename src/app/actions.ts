
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

// Helper function to check if an object looks like a Deal
function isDealObject(obj: any): obj is Deal {
  return obj && typeof obj === 'object' && typeof obj["Deal Title"] === 'string' && Array.isArray(obj.Plans);
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
  let response: Response | null = null; // Declare response outside try block

  try {
    console.log(`Fetching deal info for URL: ${url}`);
    response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }), // Send URL in the body as 'url'
       cache: 'no-store', // Ensure fresh data
    });

    console.log(`Webhook response status: ${response.status} ${response.statusText}`);

    const responseText = await response.text(); // Get raw response text first
    console.log("Raw webhook response text:", responseText);

    if (!response.ok) {
      // Attempt to parse error response if possible, otherwise use raw text
      let errorDetails = responseText;
      try {
        const errorJson = JSON.parse(responseText);
        errorDetails = JSON.stringify(errorJson, null, 2); // Prettify JSON error
      } catch (e) {
        // Ignore parsing error, use raw text
      }
      console.error(`Webhook error response: ${errorDetails}`);
      throw new Error(`Webhook request failed: ${response.status} ${response.statusText}. Details: ${errorDetails}`);
    }

    let parsedData: any;
    try {
       parsedData = JSON.parse(responseText);
    } catch (parseError) {
        console.error("Failed to parse webhook JSON response:", parseError);
        console.error("Response text was:", responseText);
        throw new Error("Invalid JSON received from webhook.");
    }

    console.log("Parsed webhook response data:", parsedData);

    let dealData: Deal[];

    if (Array.isArray(parsedData)) {
        // Validate if all elements in the array match the Deal structure - basic check on first element
         if (parsedData.length > 0 && !isDealObject(parsedData[0])) {
             console.error("Webhook response array contains invalid deal structure:", parsedData[0]);
            throw new Error("Invalid deal structure received within the array from webhook.");
        }
       dealData = parsedData as Deal[];
    } else if (isDealObject(parsedData)) {
       // If it's a single object that matches the Deal structure, wrap it in an array
       console.log("Webhook returned a single Deal object, wrapping in array.");
       dealData = [parsedData];
    } else {
       // If it's neither an array nor a valid single Deal object
       console.error("Webhook response is not an array and not a valid Deal object:", parsedData);
       throw new Error(`Invalid response format received from webhook. Expected an array of deals or a single deal object, but received type: ${typeof parsedData}`);
    }


    // Basic validation of the first deal object structure (redundant if isDealObject is comprehensive, but safe)
    if (dealData.length > 0) {
        const firstDeal = dealData[0];
         if (!isDealObject(firstDeal)) { // Use the helper function for consistency
            console.error("Webhook response structure is invalid after processing:", firstDeal);
            throw new Error("Invalid deal structure identified after processing webhook response.");
        }
    } else {
        console.log("Webhook returned an empty array or no deals found.");
        // Consider returning success but with empty data if an empty array is valid
        // return { success: true, data: [] };
    }


    return { success: true, data: dealData };
  } catch (error) {
    console.error("Error fetching or processing deal info:", error);
     const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    // Add response status to the error message if available
    const statusText = response ? ` (Status: ${response.status} ${response.statusText})` : '';
    return { success: false, error: `Failed to fetch deal details: ${errorMessage}${statusText}` };
  }
}

    