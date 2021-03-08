export const usersOnPage = 20;
export let usersOnPageDynamic = usersOnPage;
export const fetchingStep = 5;
const leadUserCardsDefiner = () => {
    let leadUserCards = [];
    for (let i=0; i < usersOnPage; i+=fetchingStep){
        leadUserCards.push(i);
    }
    return leadUserCards;
}

export const leadUserCards = leadUserCardsDefiner();

export const pageToFetchDefiner = (appPage: number, orderNumber: number) => {
    const currentUsersPageStartsAt = usersOnPage/fetchingStep*(appPage-1);
    return currentUsersPageStartsAt+leadUserCards.indexOf(orderNumber);
}
