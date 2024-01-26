

function getTodaysDate(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const teamLogoLinks = {
    Celtics: 'https://content.sportslogos.net/logos/6/213/thumbs/slhg02hbef3j1ov4lsnwyol5o.gif',
    Hawks: 'https://content.sportslogos.net/logos/6/220/thumbs/22081902021.gif',
    Nets: 'https://content.sportslogos.net/logos/6/3786/thumbs/hsuff5m3dgiv20kovde422r1f.gif',
    Hornets: 'https://content.sportslogos.net/logos/6/5120/thumbs/512019262015.gif',
    Bulls: 'https://content.sportslogos.net/logos/6/221/thumbs/hj3gmh82w9hffmeh3fjm5h874.gif',
    Cavaliers: 'https://content.sportslogos.net/logos/6/222/thumbs/22253692023.gif',
    Mavericks: 'https://content.sportslogos.net/logos/6/228/thumbs/22834632018.gif',
    Nuggets: 'https://content.sportslogos.net/logos/6/229/thumbs/22989262019.gif',
    Pistons: 'https://content.sportslogos.net/logos/6/223/thumbs/22321642018.gif',
    Warriors: 'https://content.sportslogos.net/logos/6/235/thumbs/23531522020.gif',
    Rockets: 'https://content.sportslogos.net/logos/6/230/thumbs/23068302020.gif',
    Pacers: 'https://content.sportslogos.net/logos/6/224/thumbs/22448122018.gif',
    Clippers: 'https://content.sportslogos.net/logos/6/236/thumbs/23637762019.gif',
    Lakers: 'https://content.sportslogos.net/logos/6/237/thumbs/23773242024.gif',
    Grizzlies: 'https://content.sportslogos.net/logos/6/231/thumbs/23143732019.gif',
    Heat: 'https://content.sportslogos.net/logos/6/214/thumbs/burm5gh2wvjti3xhei5h16k8e.gif',
    Bucks: 'https://content.sportslogos.net/logos/6/225/thumbs/22582752016.gif',
    Timberwolves: 'https://content.sportslogos.net/logos/6/232/thumbs/23296692018.gif',
    Pelicans: 'https://content.sportslogos.net/logos/6/4962/thumbs/496292922024.gif',
    Knicks: 'https://content.sportslogos.net/logos/6/216/thumbs/21671702024.gif',
    Thunder: 'https://content.sportslogos.net/logos/6/2687/thumbs/khmovcnezy06c3nm05ccn0oj2.gif',
    Magic: 'https://content.sportslogos.net/logos/6/217/thumbs/wd9ic7qafgfb0yxs7tem7n5g4.gif',
    '76ers': 'https://content.sportslogos.net/logos/6/218/thumbs/21870342016.gif',
    Suns: 'https://content.sportslogos.net/logos/6/238/thumbs/23843702014.gif',
    'Trail Blazers': 'https://content.sportslogos.net/logos/6/239/thumbs/23997252018.gif',
    Kings: 'https://content.sportslogos.net/logos/6/240/thumbs/24040432017.gif',
    Spurs: 'https://content.sportslogos.net/logos/6/233/thumbs/23325472018.gif',
    Raptors: 'https://content.sportslogos.net/logos/6/227/thumbs/22770242021.gif',
    Jazz: 'https://content.sportslogos.net/logos/6/234/thumbs/23485132023.gif',
    'Wizards': 'https://content.sportslogos.net/logos/6/219/thumbs/21956712016.gif'
};

function getNameFromGame(game){
    //return game.home_team.name + " - " + game.visitor_team.name;
}

function getMaxScore(game){
    const homeMax = Math.max(...game.scores.home.linescore.map(Number));
    const visitorMax = Math.max(...game.scores.visitors.linescore.map(Number));
    return Math.max(homeMax, visitorMax);
}
export default {teamLogoLinks};
export {getTodaysDate, getNameFromGame, getMaxScore};