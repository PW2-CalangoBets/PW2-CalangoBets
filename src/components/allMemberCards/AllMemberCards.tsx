import './AllMemberCards.scss';
import MemberCard from '../cards/memberCard/MemberCard';

const AllMemberCards = () => {
    return (
        <div className='allMemberCards-container'>
            <MemberCard
                photo="https://avatars.githubusercontent.com/u/143756812?v=4"
                nickname="O LOUCO"
                name="João Gabriel"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            />
            <MemberCard
                photo="https://avatars.githubusercontent.com/u/111616576?v=4"
                nickname="O MALUCO"
                name="Gustavo Pereira"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            />
            <MemberCard
                photo="https://avatars.githubusercontent.com/u/109966871?v=4"
                nickname="O PIRADO"
                name="Victor Ivis"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            />
            <MemberCard
                photo="https://avatars.githubusercontent.com/u/140849154?v=4"
                nickname="O ALUCINADO"
                name="Alexandre Evangelista"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            />
            <MemberCard
                photo="https://avatars.githubusercontent.com/u/129469205?v=4"
                nickname="O BILÉ"
                name="Daniel Lima"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            />
            <MemberCard
                photo="https://avatars.githubusercontent.com/u/132231345?v=4"
                nickname="O DESBITOLADO"
                name="Kahê Mikáyas"
                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            />
        </div>
    );
}

export default AllMemberCards;