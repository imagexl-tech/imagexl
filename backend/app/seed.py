"""Populates the database with starter data on first run.

Run manually with: python -m app.seed
It is also called automatically on server startup and is safe to re-run —
it only inserts data when a table is empty.
"""
from .database import SessionLocal, engine, Base
from . import models, auth as auth_utils
from .config import settings

PRODUCTS = [
    dict(name="Premium Wall Chimney 90cm", category="Chimneys", brand="Bosch", price=24999,
         description="Auto-clean wall-mounted chimney with high suction power, ideal for Indian kitchens.",
         warranty="2 years", image_url=""),
    dict(name="Auto-Clean Chimney", category="Chimneys", brand="Kaff", price=18999,
         description="Baffle filter chimney with touch controls and LED lighting.",
         warranty="2 years", image_url=""),
    dict(name="Designer 90cm Chimney", category="Chimneys", brand="Faber", price=27999,
         description="Curved glass designer chimney with motion sensor controls.",
         warranty="1 year", image_url=""),
    dict(name="Silent Power Chimney", category="Chimneys", brand="Hafele", price=32999,
         description="Low-noise heavy duct chimney built for high-volume cooking.",
         warranty="2 years", image_url=""),
    dict(name="Modern Kitchen Chimney", category="Chimneys", brand="Crompton", price=15999,
         description="Compact chimney suited for small and medium kitchens.",
         warranty="1 year", image_url=""),
    dict(name="Slimline Chimney", category="Chimneys", brand="Electrolux", price=21999,
         description="Slim profile chimney with filterless technology.",
         warranty="2 years", image_url=""),
    dict(
        name="Auto Clean Island Kitchen Chimney 90cm 1600 m3/h (CH1000MSACISBL90)",
        category="Chimneys", brand="Glen", price=41997,
        description="Filter-less auto-clean island chimney with a BLDC motor, built for open kitchen "
                     "layouts with high suction needs.",
        warranty="1 year", image_url="",
        images=[
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/CH1000ISLAND_8d2c0aba-731f-422d-a530-eb7f8b41f4cb.jpg?v=1783681076",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1753105172_Glen_Performance_Feb_Chimney_1000-01.jpg?v=1786424337",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1753105172_Glen_Performance_Feb_Chimney_1000-05.jpg?v=1786424337",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1753105172_Glen_Performance_Feb_Chimney_1000-02.jpg?v=1786424337",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1753105172_Glen_Performance_Feb_Chimney_1000-03.jpg?v=1786424337",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1753105172_Glen_Performance_Feb_Chimney_1000-04.jpg?v=1786424336",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/7_09a8f966-c8a3-40ce-a033-2c9ff55c0814.jpg?v=1753174237",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/chdimension.jpg?v=1753174237",
        ],
        features=[
            "Filter-less auto-clean cleaning technology",
            "BLDC motor for stronger suction at lower noise and power draw",
            "1600 m3/hr suction capacity",
            "Island installation, ducted mode",
            "Touch controls with motion sensor",
            "Remote control included",
            "Aeration, Intelli-Clean and Stir Fry smart modes",
        ],
        variants=[
            {"label": "90cm", "price": 41997, "compare_at_price": 59995},
        ],
    ),
    dict(
        name="Auto Clean Chimney with LCD Display, Heat Sensor & BLDC Motor (CH6052LCDDCAC)",
        category="Chimneys", brand="Glen", price=29246,
        description="Island chimney with an LCD display and heat-sensor triggered auto-clean cycle, "
                     "available in three widths.",
        warranty="1 year", image_url="",
        images=[
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1_5d8d5064-110c-4ff6-ba08-c1ad1a6946e2.jpg?v=1753089186",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1_9292d23f-59e8-483b-bda1-43fa414ef25b.jpg?v=1785920409",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/2_b02af8bf-9980-47bd-bde3-808fb14a6bfa.jpg?v=1785920409",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/3_669d1baa-eec7-4984-b379-0520d2a726b2.jpg?v=1785920409",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/4_d55c6777-ff31-4429-90de-2e966e667a99.jpg?v=1785920409",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/5_6170552f-376f-4f1f-9c5a-eac0d8ccfda2.jpg?v=1785920410",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/6_48994968-7744-4501-a39a-828802892083.jpg?v=1785920409",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/7_2d45e469-f821-4264-bc55-4090d2a4c126.jpg?v=1785920634",
        ],
        features=[
            "LCD display panel",
            "Heat sensor triggers auto-clean cycle",
            "Filter-less auto-clean technology",
            "BLDC motor",
            "Touch controls",
            "Island installation, ducted mode",
            "1600 m3/hr suction capacity",
        ],
        variants=[
            {"label": "60cm", "price": 29246, "compare_at_price": 38995},
            {"label": "76cm", "price": 30746, "compare_at_price": 40995},
            {"label": "90cm", "price": 32246, "compare_at_price": 42995},
        ],
    ),
    dict(
        name="Auto Clean Chimney with Double Draft Suction & Heat Sensor (CH 6076 HSR DC AC)",
        category="Chimneys", brand="Glen", price=22547,
        description="Wall-mounted angular glass chimney with double draft suction and a heat-sensor "
                     "auto-clean cycle, available in three widths.",
        warranty="1 year", image_url="",
        images=[
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1_8f35ebb1-6135-46d0-aba8-d7fe8c4951ec.jpg?v=1787546653",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1753105172GlenPerformanceFeb_Chimney6076-01.jpg?v=1785400742",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1753105172GlenPerformanceFeb_Chimney6076-02.jpg?v=1785400742",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1753105172GlenPerformanceFeb_Chimney6076-03.jpg?v=1785400742",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1753105172GlenPerformanceFeb_Chimney6076-04.jpg?v=1785400742",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1753105172GlenPerformanceFeb_Chimney6076-05.jpg?v=1785400742",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/6076-60-75-90-CHIMNEY.jpg?v=1735622156",
        ],
        features=[
            "Double draft suction",
            "Heat sensor triggers auto-clean cycle",
            "Filter-less auto-clean technology",
            "BLDC motor",
            "Motion sensor with touch control and remote",
            "Aeration, Intelli-Clean and Stir Fry smart modes",
            "1600 m3/hr suction capacity",
        ],
        variants=[
            {"label": "60cm", "price": 22547, "compare_at_price": 40995},
            {"label": "75cm", "price": 23547, "compare_at_price": 42995},
            {"label": "90cm", "price": 24197, "compare_at_price": 43995},
        ],
    ),
    dict(
        name="Auto Clean Glass Chimney Filter-less with Heat Sensor (CH 6065 HSR BLDC BL AC)",
        category="Chimneys", brand="Glen", price=21447,
        description="Wall-mounted angular glass chimney, filter-less with a heat-sensor auto-clean "
                     "cycle, available in three widths.",
        warranty="1 year", image_url="",
        images=[
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/6065.jpg?v=1733289731",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/60_75-min.jpg?v=1715851085",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/90-min.jpg?v=1715851085",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/6065_f3925007-42da-45ec-9bb3-7c81479afbb5.jpg?v=1733289758",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/CH6065HSRBLDCBLAC-8.jpg?v=1733463643",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/CH6065HSRBLDCBLAC-2.jpg?v=1733463643",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/CH6065HSRBLDCBLAC-3.jpg?v=1733463643",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/CH6065HSRBLDCBLAC-4.jpg?v=1733463643",
        ],
        features=[
            "Filter-less auto-clean technology",
            "Heat sensor triggers auto-clean cycle",
            "BLDC motor",
            "Motion sensor with remote control",
            "Aeration, Intelli-Clean and Stir Fry smart modes",
            "1600 m3/hr suction capacity",
        ],
        variants=[
            {"label": "60cm", "price": 21447, "compare_at_price": 38995},
            {"label": "75cm", "price": 22547, "compare_at_price": 40995},
            {"label": "90cm", "price": 23647, "compare_at_price": 42995},
        ],
    ),
    dict(
        name="Auto Clean Matt Glass Chimney Filter-less with Heat Sensor (CH6073HSRMGAC)",
        category="Chimneys", brand="Glen", price=30547,
        description="Wall-mounted matt-finish glass chimney, filter-less with a heat-sensor "
                     "auto-clean cycle, available in three widths.",
        warranty="1 year", image_url="",
        images=[
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/FRONT-1.jpg?v=1753263246",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/Matt-Finish.jpg?v=1765172843",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/Stir-fry.jpg?v=1765172843",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/Remote-control_bf5041ef-0372-4437-a471-a844a3327cdc.jpg?v=1765172843",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/Suction-power_fe105f84-8555-4d93-b0ba-9a2759c4f3ae.jpg?v=1765172843",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/Motion-sensor-control.jpg?v=1765172843",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/Heat-sensor.jpg?v=1765172843",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/BLDC-MOTOR_d6d59ad8-b0eb-4713-84d1-464dee7f47af.jpg?v=1765172843",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/intelli-clean.jpg?v=1765172843",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/Oil-collector-tray.jpg?v=1765172843",
        ],
        features=[
            "Matt-finish glass panel",
            "Filter-less auto-clean technology",
            "Heat sensor triggers auto-clean cycle",
            "BLDC motor",
            "Motion sensor with touch control and remote",
            "Aeration, Intelli-Clean and Stir Fry smart modes",
            "Removable oil collector tray",
            "1600 m3/hr suction capacity",
        ],
        variants=[
            {"label": "60cm", "price": 30547, "compare_at_price": 46995},
            {"label": "75cm", "price": 31197, "compare_at_price": 47995},
            {"label": "90cm", "price": 31847, "compare_at_price": 48995},
        ],
    ),
    dict(
        name="Auto Clean Glass Filterless Chimney with Inverter Technology (6074 AC)",
        category="Chimneys", brand="Glen", price=33597,
        description="Wall-mounted angular glass chimney, filter-less, built around an inverter-driven "
                     "BLDC motor, available in three widths.",
        warranty="1 year", image_url="",
        images=[
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1_84ca55fa-c610-4be1-91a1-bd240f7ac9a1.jpg?v=1771923923",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/2_b03164b4-1da9-4531-914c-974e0466e435.jpg?v=1771923923",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/3_3cb45c8d-14d7-4824-9810-328fded585d8.jpg?v=1771923923",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/products/2_f15cdd5d-b662-4e81-a8e0-3dd525bfb7b9.jpg?v=1771923923",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/products/9_7ecdaf55-2ce9-4d83-b0f6-dadab1af848b.jpg?v=1771923923",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/files/1_ec166260-7b74-46d3-aa5b-96ecc2c6399f.jpg?v=1771923923",
            "https://cdn.shopify.com/s/files/1/0569/6883/9344/products/11_1cc02de9-901b-4c7d-b22a-acd6e103170e.jpg?v=1771923923",
        ],
        features=[
            "Inverter-driven BLDC motor",
            "Filter-less auto-clean technology",
            "Motion sensor with touch control",
            "Aeration and Stir Fry smart modes",
            "1600 m3/hr suction capacity",
        ],
        variants=[
            {"label": "60cm", "price": 33597, "compare_at_price": 47995},
            {"label": "75cm", "price": 34297, "compare_at_price": 48995},
            {"label": "90cm", "price": 34997, "compare_at_price": 49995},
        ],
    ),
    dict(name="4 Burner Gas Stove", category="Stoves", brand="Bosch", price=8999,
         description="Toughened glass top gas stove with brass burners.",
         warranty="1 year", image_url=""),
    dict(name="3 Burner Gas Stove", category="Stoves", brand="Faber", price=6499,
         description="Compact stainless steel gas stove for everyday cooking.",
         warranty="1 year", image_url=""),
    dict(name="Built-in 4 Burner Hob", category="Hobs", brand="Hindware", price=19999,
         description="Built-in hob with auto flame failure device and brass burners.",
         warranty="2 years", image_url=""),
    dict(name="Built-in Electric Oven", category="Ovens", brand="Bosch", price=45999,
         description="60cm built-in electric oven with multiple cooking modes.",
         warranty="2 years", image_url=""),
    dict(name="Premium Kitchen Sink", category="Sinks", brand="Hafele", price=11999,
         description="Single bowl stainless steel sink with drainboard.",
         warranty="5 years", image_url=""),
    dict(name="Freestanding Dishwasher", category="Dishwashers", brand="Bosch", price=54999,
         description="12 place setting freestanding dishwasher with multiple wash programs.",
         warranty="2 years", image_url=""),
    dict(name="Premium Refrigerator 300L", category="Refrigerators", brand="Electrolux", price=42999,
         description="Frost-free double door refrigerator with inverter compressor.",
         warranty="10 years on compressor", image_url=""),
    dict(name="Inverter Split AC 1.5T", category="AC", brand="Crompton", price=36999,
         description="5-star inverter split AC with fast cooling and low noise operation.",
         warranty="1 year comprehensive, 5 years on compressor", image_url=""),
    dict(name="Mixer Grinder 750W", category="Small Appliances", brand="Sujatha", price=4499,
         description="750W mixer grinder with 3 stainless steel jars.",
         warranty="2 years", image_url=""),
    dict(name="Curved Glass Chimney 60cm", category="Chimneys", brand="Glen", price=13999,
         description="Curved glass chimney with push-button control and baffle filter.",
         warranty="1 year", image_url=""),
    dict(name="Built-in Hob 3 Burner", category="Hobs", brand="Kaff", price=16999,
         description="Tempered glass built-in hob with brass burners and auto ignition.",
         warranty="2 years", image_url=""),
    dict(name="Kitchen Sink with Mixer Set", category="Sinks", brand="Hindware", price=8999,
         description="Corrosion-resistant kitchen sink and mixer set with a matte finish.",
         warranty="5 years", image_url=""),
]

TESTIMONIALS = [
    dict(name="Priya Sharma", rating=5,
         message="Excellent service and genuine advice on choosing the right chimney for our kitchen. Highly recommend Image Marketing Agencies!",
         approved=True),
    dict(name="Rohit Verma", rating=5,
         message="Bought our refrigerator and AC from here. Fair pricing and the team helped with installation coordination too.",
         approved=True),
    dict(name="Anita Desai", rating=4,
         message="Good variety of brands under one roof. The showroom staff were patient in explaining the differences between models.",
         approved=True),
]


def run():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(models.Product).count() == 0:
            for item in PRODUCTS:
                db.add(models.Product(**item))
            db.commit()
            print(f"Seeded {len(PRODUCTS)} products.")

        if db.query(models.Testimonial).count() == 0:
            for item in TESTIMONIALS:
                db.add(models.Testimonial(**item))
            db.commit()
            print(f"Seeded {len(TESTIMONIALS)} testimonials.")

        if db.query(models.AdminUser).count() == 0:
            admin = models.AdminUser(
                username=settings.admin_username,
                hashed_password=auth_utils.hash_password(settings.admin_password),
            )
            db.add(admin)
            db.commit()
            print(f"Created admin user '{settings.admin_username}'.")
    finally:
        db.close()


if __name__ == "__main__":
    run()
