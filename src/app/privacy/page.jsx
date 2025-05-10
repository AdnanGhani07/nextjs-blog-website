import Image from "next/image";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center my-7">Privacy & Solitude</h1>
      <Image
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        width={800}
        height={400}
        alt="Peaceful solitude landscape"
        className="rounded-xl shadow-md mx-auto mb-8"
      />
      <p className="text-gray-600 dark:text-gray-200 italic mb-6">
        “Solitude is not the absence of company but the moment when our soul is
        free to speak.”
      </p>
      <div className="text-gray-700 dark:text-gray-200 space-y-5 text-lg italic">
        <p>
          In this quiet corner of the web, your privacy is sacred. Just as a
          journal holds your whispered thoughts, this site respects the sanctity
          of your presence.
        </p>
        <p>
          We do not chase you with trackers or pry into your reading habits. The
          words you read, the pages you linger on—they are for you alone.
        </p>
        <ul className="list-disc list-inside pl-2 space-y-2">
          <li>No intrusive ads</li>
          <li>No unnecessary data collection</li>
          <li>No sale of your personal information</li>
        </ul>
        <p>
          Any information you choose to share—through comments, subscriptions,
          or messages—is used solely to connect more meaningfully with you, and
          is never passed along without consent.
        </p>
        <p>Here, your solitude is honored. And your privacy, preserved.</p>
      </div>
    </div>
  );
}
