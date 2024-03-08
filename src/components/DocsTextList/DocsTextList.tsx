export const DocsTextList = (textList: string[]) => {
    return (
        <ul style={{ marginLeft: 22, marginBottom: 10 }}>
            {textList.map((text, index) => {
                return <li key={index.toString()}>{text}</li>;
            })}
        </ul>
    );
};