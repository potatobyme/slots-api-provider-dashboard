"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateAPI() {
  const [apiName, setApiName] = useState("")
  const [apiDescription, setApiDescription] = useState("")
  const [apiType, setApiType] = useState("rest")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({ apiName, apiDescription, apiType })
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Create New API</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <div>
          <label htmlFor="apiName" className="block mb-2">
            API Name
          </label>
          <Input
            id="apiName"
            value={apiName}
            onChange={(e) => setApiName(e.target.value)}
            placeholder="Enter API name"
            required
          />
        </div>
        <div>
          <label htmlFor="apiDescription" className="block mb-2">
            API Description
          </label>
          <Textarea
            id="apiDescription"
            value={apiDescription}
            onChange={(e) => setApiDescription(e.target.value)}
            placeholder="Describe your API"
            required
          />
        </div>
        <div>
          <label htmlFor="apiType" className="block mb-2">
            API Type
          </label>
          <Select value={apiType} onValueChange={setApiType}>
            <SelectTrigger>
              <SelectValue placeholder="Select API type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rest">REST</SelectItem>
              <SelectItem value="graphql">GraphQL</SelectItem>
              <SelectItem value="soap">SOAP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Create API</Button>
      </form>
    </div>
  )
}

