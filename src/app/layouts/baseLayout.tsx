import { Layout } from 'shared/ui/'
// import { DebugModeToggler } from '@/widgets/DebugModeToggler'
// import { LayoutHeader } from '@/widgets/LayoutHeader'
// import { LayoutProfileCard } from '@/widgets/LayoutProfileCard'
// import { Logo } from '@/widgets/Logo'
import Navigation from "widgets/navigation";

/**
 * ✅ FSD Best practice
 *
 * (1) Divide layout in two modules: dumb layout grid (shared)
 * and smart layout with widgets (this file)
 *
 * (2) Avoid cross-import using slot (render prop) pattern
 * Pass widgets as props to layout
 */
export const baseLayout = (
    <Layout
        headerSlot={
            <Navigation />
        }
    />
)