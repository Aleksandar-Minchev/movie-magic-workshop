export default function showRating(rating){
    rating = Number(rating);
    return '★'.repeat(Math.trunc(rating));
}