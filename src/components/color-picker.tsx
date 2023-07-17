"use client";

import { useCallback, useState, type ChangeEvent } from "react";
import Image from "next/image";
import Color from "color";
import { Copy, Pipette } from "lucide-react";
import useEyeDropper from "use-eye-dropper";

import { useToast } from "@/components/ui/use-toast";
import { type ColorData } from "@/types";

import { AspectRatio } from "./ui/aspect-ratio";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

async function fetchColor(hexColor: string): Promise<ColorData> {
  const color = hexColor.replace("#", "");
  const result = await fetch(`https://www.thecolorapi.com/id?hex=${color}`);

  if (!result.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await result.json()) as ColorData;
}

export default function ColorPicker() {
  const { toast } = useToast();
  const { open, close } = useEyeDropper();

  const [image, setImage] = useState<string>("");
  const [colorName, setColorName] = useState<string>("");
  const [color, setColor] = useState<string>("#ffffff");

  const pickColor = useCallback(async () => {
    const openPicker = async () => {
      const color = await open();
      setColor(color.sRGBHex);
      await fetchColor(color.sRGBHex).then((data) => {
        setColorName(data.name.value);
      });
    };
    await openPicker();
  }, [open]);

  const handleCopyColor = async ({
    label,
    text,
  }: {
    label: string;
    text: string;
  }) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: `${label}: ${text}`,
      duration: 1300,
    });
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  function convertColor(hexColor: string): {
    label: "HEX" | "RGB" | "CMYK" | "HSL";
    value: string;
  }[] {
    return [
      {
        label: "HEX",
        value: hexColor,
      },
      {
        label: "HSL",
        value: Color(hexColor).hsl().string(),
      },
      {
        label: "RGB",
        value: Color(hexColor).rgb().string(),
      },
      {
        label: "CMYK",
        value: Color(hexColor).cmyk().string(),
      },
    ];
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 pt-4 md:grid-cols-4">
      <div className="col-span-1 flex flex-col gap-4 align-middle">
        <Input
          onChange={(e) => handleFileInput(e)}
          type="file"
          accept="image/*"
          onAbort={close}
        />
        <Button variant="secondary" className="w-full" onClick={pickColor}>
          Use Eyedropper <Pipette className="ml-2 h-3 w-3" />
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`${
                Color(color).isDark()
                  ? "text-white hover:text-white/80"
                  : "text-black hover:text-black/80"
              } flex w-full gap-x-2`}
              style={{ background: color }}
            >
              <span>{color}</span>
              <span>{colorName ? ` (${colorName})` : "(White)"}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-col gap-4" align="start">
            <div className="flex items-center gap-x-2 align-middle">
              <p className="leading-relaxed">
                <span className="font-bold">Color Name:</span>{" "}
                {colorName ? colorName : "White"}
              </p>
              <Button
                variant="outline"
                size="icon"
                onClick={async () =>
                  await handleCopyColor({
                    label: "Color Name",
                    text: colorName ? colorName : "White",
                  })
                }
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {convertColor(color).map((color) => (
              <div
                key={color.label}
                className="flex items-center gap-x-2 align-middle"
              >
                <p className="leading-relaxed">
                  <span className="font-bold">{color.label}:</span>{" "}
                  {color.value}
                </p>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={async () =>
                    await handleCopyColor({
                      label: color.label,
                      text: color.value,
                    })
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>

      <div className="cols-span-1 md:col-span-3">
        {image ? (
          <div className="w-full">
            <AspectRatio ratio={16 / 9}>
              <Image
                fill
                quality={100}
                className="rounded-md object-cover"
                src={image}
                alt="Uploaded Image"
              />
            </AspectRatio>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center rounded-md border border-border p-6 align-middle">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="4em"
              width="4em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707v5.586l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zm-1.498 4a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"></path>
              <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z"></path>
            </svg>
            <p className="pt-2 text-lg font-medium">Upload an Image first</p>
          </div>
        )}
      </div>
    </div>
  );
}
