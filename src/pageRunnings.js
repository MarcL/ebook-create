const headerFooterHeight = '1cm';

const pageNumbers = (pageNumber, totalPages) => {
    return `<small><span style="float:right;color=#ddd;">${pageNumber}</span></small>`;
};

const pageTitle = () => {
    return '<small><span style="text-align:center">Document Title</span></small>';
};

const footer = {
    contents: pageNumbers,
    height: headerFooterHeight
};

const header = {
    contents: pageTitle,
    height: headerFooterHeight
}

export {
    header,
    footer
};
