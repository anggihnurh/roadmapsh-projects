import { FolderGit2, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function App() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 selection:bg-primary selection:text-primary-foreground">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-muted ring-1 ring-border shadow-xs">
            <FolderGit2 className="size-8 text-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">GitHub Random Repository</h1>
          <p className="text-sm text-muted-foreground">
            Find and explore interesting repositories on GitHub by programming language.
          </p>
        </div>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Project Initialized</CardTitle>
              <Badge variant="secondary">Ready</Badge>
            </div>
            <CardDescription>
              Vite + React + TanStack Query + Axios + shadcn/ui
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Starter project is ready. Select a language and fetch random repositories using the GitHub Search API.
            </p>
            <Button className="w-full gap-2 font-medium" size="lg">
              <Sparkles className="size-4" />
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
