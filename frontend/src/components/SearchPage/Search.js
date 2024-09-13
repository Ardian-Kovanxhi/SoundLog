import { useSelector } from 'react-redux';

export default function SearchPage() {
    const results = useSelector(state => state.search.searchResults);

    return (
        <div style={{ margin: "auto", zIndex: 1000, width: "1240px" }}>
            {JSON.stringify(results)}
        </div>
    )
}