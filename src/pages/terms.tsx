export default function Terms() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <div className="mt-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Terms of Service</h1>
        <p className="text-white/50 mt-2 text-sm">Last updated: April 2026</p>
      </div>

      <div className="glass-panel p-6 sm:p-8 flex flex-col gap-6 text-white/70 leading-relaxed text-sm sm:text-base">

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">1. Acceptance of Terms</h2>
          <p>By using <strong className="text-white">Astral of the Forthless</strong> ("the Bot"), a WhatsApp-based RPG bot, you agree to be bound by these Terms of Service. If you do not agree, stop using the Bot immediately. The Bot operates exclusively through WhatsApp and is not affiliated with Meta Platforms, Inc.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">2. Eligibility</h2>
          <p>You must be at least 13 years old to use the Bot. By using it, you confirm you meet this requirement. Users under 18 should have parental consent before making any in-game purchases.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">3. Game Currency &amp; Purchases</h2>
          <p>In-game gold and Astral Coins are virtual currencies with no real-world monetary value. They cannot be withdrawn, transferred to cash, or exchanged outside the game. All purchases made through the Premium Store are final and non-refundable unless required by applicable law. In-game items, cards, and currency may be modified or removed at any time.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">4. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside flex flex-col gap-1 pl-2 text-white/60">
            <li>Use bots, macros, or automation to interact with the Bot</li>
            <li>Exploit bugs or glitches to gain unfair advantages</li>
            <li>Harass, threaten, or abuse other players through the platform</li>
            <li>Sell or transfer your account to another person</li>
            <li>Attempt to manipulate or disrupt the game economy</li>
            <li>Impersonate Astral staff or administrators</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">5. Account Suspension</h2>
          <p>We reserve the right to suspend or permanently ban any account that violates these Terms. Banned accounts forfeit all in-game progress, currency, and purchased items without compensation. Appeals can be submitted to our admin team via WhatsApp or our official group.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">6. Game Modifications</h2>
          <p>We may add, modify, or remove game features, cards, items, shops, or mechanics at any time without prior notice. Seasonal content and time-limited events may expire. We are not liable for any loss of virtual items due to planned or unplanned game changes.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">7. WhatsApp Platform</h2>
          <p>The Bot operates within WhatsApp's messaging infrastructure. By using the Bot, you also agree to WhatsApp's own Terms of Service. We are not responsible for outages, message delivery failures, or limitations imposed by the WhatsApp platform. Bot access may be temporarily unavailable during maintenance.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">8. Intellectual Property</h2>
          <p>All game content including card artwork, characters, game systems, and branding belong to their respective owners. Anime and game characters featured in card artwork are the intellectual property of their original creators and publishers. Astral of the Forthless does not claim ownership of any third-party characters.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">9. Limitation of Liability</h2>
          <p>Astral of the Forthless is provided "as is." We make no guarantees of uptime, data integrity, or uninterrupted service. We are not liable for any indirect, incidental, or consequential damages arising from use of the Bot.</p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white">10. Contact</h2>
          <p>For any questions, appeals, or support requests, please contact us through our official WhatsApp group or reach out to a server administrator directly.</p>
        </section>

      </div>
    </div>
  );
}
