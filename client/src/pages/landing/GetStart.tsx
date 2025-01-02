function GetStarted() {
  return (
    <div className="-mt-14 relative">
      <picture>
        {/* For tablets (744px to 1020px) - WebP */}
        <source
          media="(min-width: 744px) and (max-width: 1020px)"
          srcSet="https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-tablet-1-100w.webp 100w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-tablet-1-300w.webp 300w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-tablet-1-500w.webp 500w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-tablet-1-750w.webp 750w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-tablet-1-1000w.webp 1000w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-tablet-1-1500w.webp 1500w"
          type="image/webp"
        />
        {/* For tablets (744px to 1020px) - JPEG */}
        <source
          media="(min-width: 744px) and (max-width: 1020px)"
          srcSet="https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-tablet-1-100w.jpg 100w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-tablet-1-300w.jpg 300w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-tablet-1-500w.jpg 500w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-tablet-1-750w.jpg 750w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-tablet-1-1000w.jpg 1000w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-tablet-1-1500w.jpg 1500w"
          type="image/jpeg"
        />
        {/* For desktop (1020px and above) - WebP */}
        <source
          media="(min-width: 1020px)"
          srcSet="https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-desktop-1-100w.webp 100w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-desktop-1-300w.webp 300w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-desktop-1-500w.webp 500w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-desktop-1-750w.webp 750w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-desktop-1-1000w.webp 1000w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-desktop-1-1500w.webp 1500w"
          type="image/webp"
        />
        {/* For desktop (1020px and above) - JPEG */}
        <source
          media="(min-width: 1020px)"
          srcSet="https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-desktop-1-100w.jpg 100w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-desktop-1-300w.jpg 300w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-desktop-1-500w.jpg 500w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-desktop-1-750w.jpg 750w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-desktop-1-1000w.jpg 1000w,
                  https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-desktop-1-1500w.jpg 1500w"
          type="image/jpeg"
        />
        {/* For mobile (default/fallback) */}
        <img
          className="hero__background-image"
          src="https://media-www.sqspcdn.com/images/pages/homepage/sep-2024/hero/images/en_US/hero-2024-mobile-1-500w.jpg"
          alt="Hero background"
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          loading="eager"
          decoding="async"
        />
      </picture>
      {/* The overlay div */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 w-96 h-full ml-14">
        <h1 className=" text-white text-8xl font-light text-left">
          <b>A website makes it real</b>
        </h1>
        <div className="flex mt-8 ">
          <button className="bg-white w-auto h-auto px-7 py-3 text-xs mr-3">
            <b>GET STARTED</b>
          </button>
          <p className="text-white ml-2">
            get your free website trial today.
            <br />
            no credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
