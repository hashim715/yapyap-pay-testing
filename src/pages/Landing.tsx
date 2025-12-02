import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.png";
import mobileHeroImage from "@/assets/mobile-hero.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="md:hidden w-full relative flex items-center justify-center pt-4 overflow-hidden">
        <img
          src={mobileHeroImage}
          alt="YapYap Pay - Get paid to speak"
          className="w-full h-auto object-contain -mb-16"
        />
      </div>

      <div className="md:hidden px-6 pb-6 flex flex-col">
        <h1 className="text-[2rem] font-medium tracking-tight text-foreground leading-[1.1] mb-4">
          Your voice.
          <br />
          Your money.
        </h1>

        <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">
          AI was created for everyone, yet it's rarely trained by the people it
          serves. YapYap Pay makes it simple and social for anyone to talk,
          connect, and help teach AI with their natural voice. Real people, real
          emotion, real impact, (plus extra income) along the way.
        </p>

        <div className="flex flex-col gap-2.5">
          <Button
            onClick={() => navigate("/signup")}
            className="h-9 px-10 text-[13px] font-medium rounded-lg"
          >
            Get started
          </Button>
          <Button
            onClick={() => navigate("/how-it-works")}
            variant="outline"
            className="h-9 px-10 text-[13px] font-medium rounded-lg bg-muted text-foreground border-border hover:bg-muted/80 hover:text-foreground"
          >
            How it works?
          </Button>
        </div>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center px-8 py-12 lg:py-16">
        <div className="w-full max-w-[1150px] flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-[48%] flex flex-col justify-center order-2 lg:order-1">
            <h1 className="text-[2.5rem] lg:text-[3rem] font-medium tracking-tight text-foreground leading-[1.1] mb-6 max-w-[420px]">
              Your voice.
              <br />
              Your money.
            </h1>

            <p className="text-[15px] lg:text-[16px] text-muted-foreground leading-relaxed mb-10 max-w-[420px]">
              AI was created for everyone, yet it's rarely trained by the people
              it serves. YapYap Pay makes it simple and social for anyone to
              talk, connect, and help teach AI with their natural voice. Real
              people, real emotion, real impact, (plus extra income) along the
              way.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate("/signup")}
                className="h-9 px-10 text-[13px] font-medium rounded-lg"
              >
                Get started
              </Button>
              <Button
                onClick={() => navigate("/how-it-works")}
                variant="outline"
                className="h-9 px-10 text-[13px] font-medium rounded-lg bg-muted text-foreground border-border hover:bg-muted/80 hover:text-foreground"
              >
                How it works?
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-[52%] h-[40vh] lg:h-auto flex items-center justify-center order-1 lg:order-2">
            <img
              src={heroImage}
              alt="YapYap Pay Community"
              className="w-full h-auto object-contain max-h-[600px]"
            />
          </div>
        </div>
      </div>

      <footer className="bg-white py-6">
        <div className="w-full max-w-[1150px] mx-auto px-8">
          <div className="w-full lg:w-[48%] flex flex-col gap-4">
            <div className="w-full h-[1px] bg-border"></div>
            <div className="flex flex-row gap-4 sm:gap-8 text-[13px] text-muted-foreground">
              <a
                href="/privacy-policy"
                className="hover:text-foreground hover:underline transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-use"
                className="hover:text-foreground hover:underline transition-colors"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
