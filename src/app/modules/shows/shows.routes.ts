import { Routes } from "@angular/router";
import { ShowDetailsComponent } from "./components";
import { ResultsComponent } from "./pages";

export const routes: Routes = [
    {path: '', component: ResultsComponent},
    {path: 'details', component: ShowDetailsComponent}
]