import { Routes } from "@angular/router"
import { DetailsComponent } from "./components/details/details.component"
import { ResultsComponent } from "./pages/results/results.component"

export const routes: Routes = [
    {path: '', component: ResultsComponent},
    {path: 'details', component: DetailsComponent}
]