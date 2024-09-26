
const url = "https://api.github.com/graphql";
// rate limit 5000 per hour;
const getGithubProfile = async (username) => {
    const query = `
    {
  user(login: "${username}") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
      }
    }
    repositories {
      totalCount
    }
  }
}`;

    try {
        const response = await axios.post(url, {
            query: query
        }, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data.data.user.contributionsCollection.contributionCalendar.totalContributions);   
        console.log(response.data.data.user.repositories.totalCount);   
    } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
    }
};
try{
    const data = getGithubProfile("Laksh-1512");
    
}
catch(e){
    console.log(e);
}   

const urlLeetcode="https://leetcode.com/graphql";

const LeetcodeProfile = async (username) => {
    const query1 = ` {
      matchedUser(username: "${username}") {
        username
        profile {
          ranking
          userAvatar
          realName
          aboutMe
          countryName
          reputation
          ranking
        }
          submitStats {
            acSubmissionNum {
                count
            }   
            totalSubmissionNum {
                count
            }
        }
        
        
        
      }
    }
`;


    try {
        const response = await axios.post(urlLeetcode, {
            query: query1
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

         console.log(response.data.data.matchedUser.submitStats);   
        console.log(response.data.data.matchedUser.profile);   
    } catch (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
    }
};

try{
    const data = LeetcodeProfile("laksh888");
}
catch(e){
    console.log(e);
}   