import { Hero } from "../../../components/Hero"
import { HeroImg } from "../../../components/HeroImg"

export default function(){
    return <div className="pt-4"> 
        <div>
            <Hero></Hero>
        </div>
        <div className="pt-4">
            <HeroImg></HeroImg>
        </div>
    </div>
}