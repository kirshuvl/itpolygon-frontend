export interface EditorBlock {
    time: number;
    blocks: (EditorTextBlock | EditorImageBlock)[];
}

export interface EditorBaseBlock {
    id: string;
    type: "paragraph" | "image" | "code";
}

export interface EditorTextBlock extends EditorBaseBlock {
    data: {
        text: string;
    };
}

export interface EditorImageBlock extends EditorBaseBlock {
    data: {
        file: {
            url: string;
        };
    };
}
