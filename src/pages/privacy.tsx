export default function Privacy() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <div className="mt-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
        <p className="text-white/50 mt-2 text-sm">Last updated: April 2026</p>
      </div>

      <div className="glass-panel p-6 sm:p-8 flex flex-col gap-6 text-white/70 leading-relaxed text-sm sm:text-base">

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">1. Introduction</h2>
          <p>This Privacy Policy explains what information <strong className="text-white">Astral of the Forthless</strong> ("the Bot") collects, how it is used, and your rights regarding that information. The Bot operates exclusively through WhatsApp and is committed to protecting your privacy.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">2. Information We Collect</h2>
          <p>When you interact with the Bot, we may collect:</p>
          <ul className="list-disc list-inside flex flex-col gap-1 pl-2 text-white/60">
            <li>Your WhatsApp phone number (used as a unique player ID)</li>
            <li>Your WhatsApp display name (shown in leaderboards and guilds)</li>
            <li>In-game activity: messages sent to the bot, commands used, battles fought</li>
            <li>Transaction records for in-game purchases and topups</li>
            <li>Guild membership and player-versus-player match history</li>
          </ul>
          <p className="mt-1">We do <strong className="text-white">not</strong> collect passwords, payment card numbers, or any personal information beyond what is necessary to run the game.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">3. How We Use Your Information</h2>
          <p>Collected data is used solely to:</p>
          <ul className="list-disc list-inside flex flex-col gap-1 pl-2 text-white/60">
            <li>Maintain your game account, progress, inventory, and stats</li>
            <li>Process in-game transactions and topup purchases</li>
            <li>Operate leaderboards, guilds, and PVP matchmaking</li>
            <li>Detect and prevent abuse, cheating, or Terms of Service violations</li>
            <li>Improve gameplay balance and features</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">4. Data Storage</h2>
          <p>Your game data is stored securely on our servers. We implement reasonable security measures to protect against unauthorized access, alteration, or deletion of data. However, no system is 100% secure, and we cannot guarantee absolute security of your information.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">5. Data Sharing</h2>
          <p>We do <strong className="text-white">not</strong> sell, rent, or share your personal data with third parties for advertising or marketing purposes. Your phone number is never publicly displayed — only your display name appears in leaderboards and guild listings. We may share data if required by law or to prevent harm.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">6. WhatsApp &amp; Meta</h2>
          <p>The Bot uses the WhatsApp platform to function. WhatsApp and its parent company, Meta Platforms, Inc., have their own privacy policies governing message data and platform usage. We encourage you to read <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline hover:text-white transition-colors">WhatsApp's Privacy Policy</a> separately. We do not control how Meta handles metadata from WhatsApp messages.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">7. Data Retention</h2>
          <p>We retain your game data for as long as your account is active. If you request deletion, we will remove your account data within 30 days. Note that some records (e.g., transaction history) may be retained longer as required by applicable law.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">8. Children's Privacy</h2>
          <p>The Bot is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us data, please contact us so we can delete it promptly.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">9. Your Rights</h2>
          <p>Depending on your location, you may have rights to access, correct, or delete your personal data. To make a request, contact us through our official WhatsApp group or reach out to a server administrator.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be announced in our official WhatsApp group. Continued use of the Bot after changes constitutes your acceptance of the updated policy.</p>
        </section>

      </div>
    </div>
  );
}
