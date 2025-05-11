"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBox() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Input
            type="text"
            placeholder="Where are you going?"
            className="w-full"
          />
        </div>
        <div>
          <Input
            type="date"
            className="w-full"
          />
        </div>
        <div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
            Search Hotels
          </Button>
        </div>
      </div>
    </div>
  )
}
