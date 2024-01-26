import teamLogoLinks from '/src/utilities.js'


function TeamView(props) {

    // console.log(props);
    // console.log(props.games.teams.visitors.name);
    // console.log(props.games);
    window.model = props;
    function renderSearchResultsCB(result) {
        console.log(result.teams.visitors.name);
        function gameChoiceACB() {props.handleDetails(result.id); window.location.hash = "#/details";}

        function addFavGame(evt) { props.addGame(result); }
        const columnStyle = {
            width: '180px', // Adjust the width as needed
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '10px', // Added space between rows
        };

        const separatorStyle = {
            fontSize: '20px',
            margin: '5px 0',
        };

        const imageStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center' }

        return (
            <div key={result.id}>
                <div onClick={gameChoiceACB} key={result.id} style={imageStyle}>
                    <div style={columnStyle}>
                        <img
                            src={result.teams.visitors.logo}
                            width="50"
                            height="50"
                            alt={result.teams.visitors.name}
                            style={{ marginBottom: '5px' }}
                        />
                        <div>{result.teams.visitors.name}</div>
                    </div>
                    <div style={{ ...separatorStyle, margin: '0 10px', lineHeight: '50px' }}>-</div>
                    <div style={columnStyle}>
                        <img
                            src={result.teams.home.logo}
                            width="50"
                            height="50"
                            alt={result.teams.home.name}
                            style={{ marginBottom: '5px' }}
                        />
                        <div>{result.teams.home.name}</div>
                    </div>

                </div>
                <button onClick={addFavGame}>Add Game to Fav.</button>
            </div>
        );
    }


    return (
        <div>
            <input
                type="date"
                value={props.currentDate}
                onChange={props.handleDateChange}
            />
            {props.games.map(renderSearchResultsCB)}
        </div>)
}

export default TeamView;