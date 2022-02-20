import Hikes from './hikes.js';
import Comments from './comments.js';

//on load grab the array and insert it into the page
const myHikes = new Hikes('hikes');
window.addEventListener('load', () => {
    myHikes.showHikeList();
});

const myComments = new Comments('comments');
window.addEventListener('load', () => {
    myComments.showCommentList();
})

const commentName = document.getElementById('comment-name').value;
const commentInput = document.getElementById('comment-content').value;
const submitCommentbutton = document.getElementById('submit-comment')
    .addEventListener('mouseup', () => myComments.addComment(commentName, new Date(), commentInput, 'comment'));