import Image from "next/image";

export default function TermsPage() {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-6 text-center my-7">Terms of Thought</h1>
        <p className="text-gray-600 dark:text-gray-200 italic mb-6">
          “Every poem, every phrase, every silence—is a piece of truth offered in trust.”
        </p>
        <div className="text-gray-700 dark:text-gray-200 space-y-5 text-lg italic">
          <p>
            By spending time on this site, you agree to wander thoughtfully. The works shared—whether poems, prose, or reflections—are original unless otherwise noted.
          </p>
          <p>
            You may quote or reference them, so long as credit is given, and the context remains respectful.
          </p>
          <ul className="list-disc list-inside pl-2 space-y-2">
            <li>Do not republish the content without permission.</li>
            <li>Do not use words here for profit without attribution.</li>
            <li>Do engage with openness, kindness, and curiosity.</li>
          </ul>
          <p>
            This is a space for sincere expression and thoughtful minds. Let’s keep it warm, welcoming, and wise.
          </p>
        </div>
      </div>
    );
  }
  