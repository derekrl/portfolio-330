let commentList = []

function readFromLS(key) {
    let data = JSON.parse(localStorage.getItem(key));
    return data;
}

function saveToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

function renderCommentList() {
    if (commentList.length === 0) {
        commentList = readFromLS('comment-list');
    }

    if (commentList && commentList.length > 0) {
        commentList.forEach(comment => {
            console.log(comment);
            // parent.appendChild(renderOneCommentLight(comment));
        });
    } else {
        console.log('Comments list is empty');
    }
    // showCommentList();
}


export default class Comment {

    constructor(name, date, content, type) {
        this.name = name;
        this.date = date;
        this.content = content;
        this.type = type;
    }

    getAllComments() {
        return commentList;
    }

    // For the first stretch we will need to get just one hike.
    getCommentByName(commentName) {
        return this.getAllComments().find(comment => comment.name === commentName);
    }

    showCommentList() {
        // commentList.forEach(comment => { console.log(comment) });
        renderCommentList();
    }

    showOneComment() {

    }

    addCommentListener() {

    }

    addComment(name, date, content, type) {
        const newComment = {
            name,
            date,
            content,
            type
        }
        commentList.push(newComment);
        saveToLS('comment-list', commentList);
        console.log(name, date, content, type);
        // console.log(commentList.length);

    }
}

