'use client';

import Button from '@/components/ui/Button';

export default function ButtonShowcase() {
  return (
    <div className="min-h-screen bg-[#F6F7F8] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0B1221] mb-8">Button Showcase</h1>
        
        <div className="space-y-8">
          {/* Primary Buttons */}
          <section>
            <h2 className="text-xl font-semibold text-[#0B1221] mb-4">Primary (Teal Brand)</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="sm">Small Primary</Button>
              <Button variant="primary" size="md">Medium Primary</Button>
              <Button variant="primary" size="lg">Large Primary</Button>
              <Button variant="primary" disabled>Disabled Primary</Button>
            </div>
          </section>

          {/* Secondary Buttons */}
          <section>
            <h2 className="text-xl font-semibold text-[#0B1221] mb-4">Secondary (Accent Mint)</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="sm">Small Secondary</Button>
              <Button variant="secondary" size="md">Medium Secondary</Button>
              <Button variant="secondary" size="lg">Large Secondary</Button>
              <Button variant="secondary" disabled>Disabled Secondary</Button>
            </div>
          </section>

          {/* Ghost Buttons */}
          <section>
            <h2 className="text-xl font-semibold text-[#0B1221] mb-4">Ghost (Text Button)</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="ghost" size="sm">Small Ghost</Button>
              <Button variant="ghost" size="md">Medium Ghost</Button>
              <Button variant="ghost" size="lg">Large Ghost</Button>
              <Button variant="ghost" disabled>Disabled Ghost</Button>
            </div>
          </section>

          {/* Outline Buttons */}
          <section>
            <h2 className="text-xl font-semibold text-[#0B1221] mb-4">Outline (Stroke)</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="sm">Small Outline</Button>
              <Button variant="outline" size="md">Medium Outline</Button>
              <Button variant="outline" size="lg">Large Outline</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
            </div>
          </section>

          {/* Success Buttons */}
          <section>
            <h2 className="text-xl font-semibold text-[#0B1221] mb-4">Success</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="success" size="sm">Small Success</Button>
              <Button variant="success" size="md">Medium Success</Button>
              <Button variant="success" size="lg">Large Success</Button>
              <Button variant="success" disabled>Disabled Success</Button>
            </div>
          </section>

          {/* Danger Buttons */}
          <section>
            <h2 className="text-xl font-semibold text-[#0B1221] mb-4">Danger (Destructive)</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="danger" size="sm">Small Danger</Button>
              <Button variant="danger" size="md">Medium Danger</Button>
              <Button variant="danger" size="lg">Large Danger</Button>
              <Button variant="danger" disabled>Disabled Danger</Button>
            </div>
          </section>

          {/* Interactive States */}
          <section>
            <h2 className="text-xl font-semibold text-[#0B1221] mb-4">Interactive States</h2>
            <div className="bg-white p-6 rounded-xl border border-black/10">
              <p className="text-[#6B7280] mb-4">Hover and click the buttons to see the transitions:</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Hover me</Button>
                <Button variant="secondary">Click me</Button>
                <Button variant="ghost">Focus me</Button>
                <Button variant="outline">Active state</Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}






