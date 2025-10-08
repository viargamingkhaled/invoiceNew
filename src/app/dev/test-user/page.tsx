'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function TestUserPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const createTestUser = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/dev/create-test-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create test user');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F8] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0B1221] mb-4">
            Test User Management
          </h1>
          <p className="text-lg text-[#6B7280]">
            Create and manage test users for development and testing
          </p>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#0B1221] mb-4">
            Create Test User
          </h2>
          <p className="text-[#6B7280] mb-4">
            This will create a test user with sample data including company information, invoices, and token balance.
          </p>
          
          <Button
            onClick={createTestUser}
            disabled={loading}
            variant="primary"
            size="lg"
          >
            {loading ? 'Creating...' : 'Create Test User'}
          </Button>
        </Card>

        {result && (
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#0B1221] mb-4">
              ✅ Test User Created Successfully
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-[#0B1221] mb-2">Login Credentials:</h4>
                <div className="bg-[#F6F7F8] p-3 rounded-lg">
                  <p><strong>Email:</strong> {result.credentials.email}</p>
                  <p><strong>Password:</strong> {result.credentials.password}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-[#0B1221] mb-2">User Information:</h4>
                <div className="bg-[#F6F7F8] p-3 rounded-lg">
                  <p><strong>Name:</strong> {result.user.name}</p>
                  <p><strong>Token Balance:</strong> {result.user.tokenBalance}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-[#0B1221] mb-2">Company:</h4>
                <div className="bg-[#F6F7F8] p-3 rounded-lg">
                  <p><strong>Name:</strong> {result.company.name}</p>
                  <p><strong>VAT:</strong> {result.company.vat}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-[#0B1221] mb-2">Sample Invoices:</h4>
                <div className="bg-[#F6F7F8] p-3 rounded-lg">
                  {result.invoices.map((invoice: any, index: number) => (
                    <p key={index}>
                      <strong>{invoice.number}</strong> - Status: {invoice.status}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {error && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              ❌ Error
            </h3>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          </Card>
        )}

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#0B1221] mb-4">
            Test User Features
          </h3>
          <div className="space-y-2 text-[#6B7280]">
            <p>• Pre-configured company information</p>
            <p>• 1000 tokens for testing</p>
            <p>• Sample invoices with different statuses</p>
            <p>• Ledger history showing token usage</p>
            <p>• Ready to test all invoice templates</p>
            <p>• Multi-currency support (GBP, EUR)</p>
          </div>
        </Card>
      </div>
    </div>
  );
}



