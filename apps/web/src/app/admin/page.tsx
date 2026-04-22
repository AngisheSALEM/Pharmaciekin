'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'

interface Pharmacy {
  id: string;
  name: string;
  isOnDuty: boolean;
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const [isOnDuty, setIsOnDuty] = useState(false)
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchPharmacy = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/pharmacies/${id}`)
      const data = await res.json()
      setPharmacy(data)
      setIsOnDuty(data.isOnDuty)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (status === 'loading') return;

    const user = session?.user as { pharmacyId?: string } | undefined
    if (user?.pharmacyId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void fetchPharmacy(user.pharmacyId)
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false)
    }
  }, [session, status, fetchPharmacy])

  const toggleOnDuty = async (checked: boolean) => {
    if (!pharmacy) return

    try {
      const res = await fetch(`/api/pharmacies/${pharmacy.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isOnDuty: checked }),
      })

      if (res.ok) {
        setIsOnDuty(checked)
        toast.success(`Statut mis à jour : ${checked ? 'De garde' : 'Pas de garde'}`)
      } else {
        toast.error('Erreur lors de la mise à jour')
      }
    } catch (error) {
        console.error(error);
        toast.error('Erreur réseau')
    }
  }

  if (status === 'loading' || loading) return <div className="p-8">Chargement...</div>
  if (!session) return <div className="p-8">Accès refusé. Veuillez vous connecter.</div>

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">Tableau de bord Pharmacien</h1>

      {pharmacy && (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>{pharmacy.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Statut &quot;De Garde&quot;</p>
                <p className="text-sm text-gray-500">
                  {isOnDuty
                    ? "Votre pharmacie est actuellement affichée comme étant de garde."
                    : "Votre pharmacie n'est pas de garde actuellement."}
                </p>
              </div>
              <Switch
                checked={isOnDuty}
                onCheckedChange={toggleOnDuty}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
