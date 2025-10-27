export default function InstallationPage() {
    return (
      <main className="min-h-screen bg-white pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Tire Installation Guide</h1>
          <p className="text-xl text-neutral-600 mb-12">
            Step-by-step instructions for installing your Goodyear bicycle tires
          </p>
  
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-4 mt-12">Tools You'll Need</h2>
            <ul className="space-y-2 mb-8">
              <li>Tire levers (2-3 recommended)</li>
              <li>Floor pump with pressure gauge</li>
              <li>Soapy water (for tubeless installations)</li>
              <li>Tubeless sealant (if applicable)</li>
              <li>Rim tape (for tubeless conversions)</li>
            </ul>
  
            <h2 className="text-3xl font-bold mb-4 mt-12">Step 1: Remove the Old Tire</h2>
            <p className="text-neutral-700 mb-6">
              Begin by completely deflating the existing tire. Remove the valve core if using tubeless setup. 
              Insert a tire lever between the tire bead and rim, about 5cm from the valve. Hook the lever under 
              the rim and pry the tire bead over the rim edge.
            </p>
  
            <h2 className="text-3xl font-bold mb-4 mt-12">Step 2: Inspect the Rim</h2>
            <p className="text-neutral-700 mb-6">
              Thoroughly check the rim for any damage, dents, or sharp edges. Remove any debris or old rim tape. 
              For tubeless setups, ensure the rim tape is properly installed and covers all spoke holes completely.
            </p>
  
            <h2 className="text-3xl font-bold mb-4 mt-12">Step 3: Install the New Tire</h2>
            <p className="text-neutral-700 mb-6">
              Place one bead of the tire onto the rim, starting at the valve hole. If using an inner tube, 
              partially inflate it and insert it into the tire. Work the second bead onto the rim using your 
              hands, starting opposite the valve. Use tire levers only if necessary for the final section.
            </p>
  
            <h2 className="text-3xl font-bold mb-4 mt-12">Step 4: Inflate and Check</h2>
            <p className="text-neutral-700 mb-6">
              Inflate the tire to the recommended pressure indicated on the tire sidewall. Check that the 
              tire is seated evenly all around the rim. For tubeless installations, you may need to use a 
              compressor or tubeless inflator to seat the bead initially.
            </p>
  
            <h2 className="text-3xl font-bold mb-4 mt-12">Step 5: Final Inspection</h2>
            <p className="text-neutral-700 mb-6">
              Spin the wheel and watch the tire surface to ensure it runs true. Check the pressure again 
              after 24 hours and adjust if necessary. For tubeless setups, rotate the wheel to distribute 
              sealant evenly.
            </p>
  
            <div className="mt-12 p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
              <h3 className="text-xl font-bold mb-4">Pro Tips</h3>
              <ul className="space-y-2">
                <li>Always install tires in the correct direction (check sidewall arrow)</li>
                <li>Use soapy water to help tubeless tires seat more easily</li>
                <li>Check tire pressure before every ride</li>
                <li>Replace tires when tread wear indicators are visible</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    )
  }
  