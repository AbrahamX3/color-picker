export function Footer() {
  return (
    <footer className="border-t py-4 md:py-4">
      <div className="flex flex-col items-center justify-between gap-4 md:h-8 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://www.abraham-dev.tech"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              AbrahamX3
            </a>
            . Source code available on{" "}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
