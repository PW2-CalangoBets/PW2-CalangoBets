import MainHeader from '../../components/header/MainHeader';
import './teamPage.scss'
import OurTeamCard from '../../components/cards/ourTeamCard/OurTeamCard';
import AllMemberCards from '../../components/allMemberCards/AllMemberCards';

const teamPage = () => {
    return (
        <div className="teamPage-container">
            <MainHeader></MainHeader>
            <OurTeamCard></OurTeamCard>
            <AllMemberCards></AllMemberCards>
        </div>
    )
}

export default teamPage;