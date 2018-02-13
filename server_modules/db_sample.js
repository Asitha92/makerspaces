// Copyright 2017, IgniterSpace.
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License this code is made available to you.

'use strict';

const config = require('../server-config');
const database = require('../server_lib/database');
const databaseName = config.get('DATABASE');

if (module === require.main) {
  const prompt = require('prompt');
  prompt.start();

  console.log(
    `Running this script directly will allow you to initialize your mysql
    database with sample data.\n`);

  prompt.get(['user', 'password'], (err, result) => {

    const connection = database.createMultipleStatementConnection(result);

    if (err) {
      return;
    }
    //create the database
    connection.query(
       `USE \`` + databaseName + `\`;` + 
       
      'DELETE FROM users;' + 
      'DELETE FROM locations;' + 
      'DELETE FROM organizations;' + 

      'INSERT INTO organizations(id, name, description) VALUES ' +
      '(1, \'IgniterSpace Sri Lanka\', \'Igniter Global own subsidiary\'),'+
      '(2, \'AIS\', \'Asian International School\');' + 
      
      'INSERT INTO locations(id, name, description, organization_id) VALUES ' +
      '(1, \'IS Gampaha\', \'2nd makerspace of IgniterSpace\', 1),'+
      '(2, \'IS Narahenpita\', \'1st makerspace of IgniterSpace\', 1),' + 
      '(3, \'IS Negombo\', \'3rd makerspace of IgniterSpace\', 1),' + 
      '(4, \'AIS Colombo\', \'IgniterSpace franchise at Asian International School\', 2);'  +

      'INSERT INTO users(id, auth_provider, auth_ref, given_name, family_name, email, profile_image) VALUES ' +
      '(1, \'google\', \'00001\', \'Hasith\', \'Yaggahavita\', \'hasith@igniterspace.com\', \'\'),' +
      '(2, \'google\', \'00002\', \'Jehan\', \'Wijesinghe\', \'jehan@igniterspace.com\', \'\'),'  +
      '(3, \'google\', \'00002\', \'Harshana\', \'Wijesinghe\', \'harshanax@oki.lk\', \'\'),'  +
      '(4, \'google\', \'00003\', \'Hasith\', \'Yaggahavita\', \'hasith@gmail.com\', \'\');'  +

      'INSERT INTO products(id, code, name, description) VALUES ' +
      '(1, \'C001\', \'Large Bottle Lid\', \'\'),'+
      '(2, \'C002\', \'Gear Motor\', \'\'),'+
      '(3, \'P001\', \'Scribble Bot\', \'\'),'+
      '(4, \'P002\', \'Electrical Fan\', \'\'),'+
      '(5, \'T001\', \'Soldering Iron\', \'\'),'+
      '(6, \'T002\', \'Hot Glue Gun\', \'\');' +

      'INSERT INTO orders(id, location_id, user_id) VALUES ' +
      '(1, 1, 1),'+
      '(2, 1, 1),'+
      '(3, 1, 1),'+
      '(4, 1, 2),'+
      '(5, 1, 2),'+
      '(6, 1, 3),'+
      '(7, 1, 4),'+
      '(8, 2, 1),'+
      '(9, 3, 1),'+
      '(10, 4, 1);'+

      'INSERT INTO order_items(id, order_id, product_id, note, quantity) VALUES ' +
      '(1, 1, 1, \'Red color is prefered\', 100),'+
      '(2, 1, 2, \'Please test the motors before shipping\', 50),'+
      '(3, 1, 3, \'Add additional felt pen to Scribble Bot packs\', 40),'+
      '(4, 2, 2, \'Yellow color\', 20),'+
      '(5, 2, 5, \'Please insulate wires\', 5),'+
      '(6, 2, 6, \'240V\', 4);' +
      

      'INSERT INTO guardians(id, name, home_number, mobile_number, email_address) VALUES ' +
      '(999,\'Kumudu Rathnayake\', \'0332222958\', \'0779158987\' ,  \'kumudu@igniterspace.com\'),'+
      '(998,\'Hasith Yaggahavita\', \'0332221819\', \'0716624132\' ,  \'hasith@igniterspace.com\'),'+
      '(997,\'Ananda Wijewickrama\', \'0332222917\', \'0710510274\' ,  \'anandaw@yahoo.com\'),'+
      '(996,\'Chathura Senarathne\', \'0332228008\', \'0774636898\' ,  \'chathuras@igniterspace.com\');' +

      'INSERT INTO students(id, first_name, last_name, date_of_birth, home_address, gender,g_id) VALUES ' +
      '(001,\'Hasith\',\'Yaggahavita\', \'28-09-1979\' ,  \'287,Yakkala Rd,Gampaha\', \'male\', 999),'+
      '(002,\'Jehan\',\'Wijesinghe\',\'05-09-1996\' , \'7, charles place,colombo\', \'male\', 998),'+
      '(003,\'Achintha\',\'Wijewickrama\',\'06-11-1993\' ,  \'287,Yakkala Rd,Gampaha\', \'male\', 997),'+
      '(004,\'Asitha\',\'Senarathne\',\'02-04-1992\' ,  \'12/2 Bandaranayake Rd, Katubadde\', \'male\', 996),'  +
      '(005, \'Subha\',\'Wijesinghe\', \'08-09-1972\', \'No 10, Sri Bodhi Rd, Gampaha\',\'female\',996);' +

      'INSERT INTO courses(id, name, year, from_date, to_date, day ) VALUES ' +
      '(1,\'Level 1\',\'2017\', \'28-02-2017\' ,  \'28-08-2017\', \'Saturday\'),'+
      '(2,\'Level 2\',\'2017/2018\',\'05-09-2017\' , \'05-03-2018\', \'Saturday\'),'+
      '(3,\'Level 3\',\'2018\',\'06-01-2018\' ,  \'06-06-2018\', \'Saturday\'),'+
      '(4,\'Level 4(Computing)\',\'2017\',\'02-04-2018\' ,\'02-10-2018\', \'Sunday\'),'  +
      '(5,\'Level 1\',\'2016/2017\', \'08-09-2016\', \'08-03-2017\', \'Sunday\');' +

      'INSERT INTO lessons(id, name, date) VALUES ' +
      '(1,\'Golfer Bot\', \'28-02-2017\' ),'+
      '(2,\'Touch Torch\',\'05-09-2017\'),'+
      '(3,\'Night Light\',\'06-01-2018\'),'+
      '(4,\'Music Box\',\'02-04-2018\'),'  +
      '(5,\'Generator\', \'08-09-2016\');'+

      'INSERT INTO lessons_in_course(c_id, l_id) VALUES ' +
      '(1, 1),'+
      '(1, 2),'+
      '(2, 1),'+
      '(3, 3),'+
      '(3, 5),'+
      '(4, 4),'+
      '(5, 1),'+
      '(5, 3);'+
     
      'INSERT INTO students_in_course(c_id, s_id) VALUES ' +
      '(1, 1),'+
      '(1, 2),'+
      '(2, 1),'+
      '(3, 3),'+
      '(3, 5),'+
      '(4, 4),'+
      '(5, 1),'+
      '(5, 3);'+

      'INSERT INTO students_in_lesson(l_id, s_id) VALUES ' +
      '(1, 1),'+
      '(1, 2),'+
      '(2, 1),'+
      '(3, 3),'+
      '(3, 5),'+
      '(4, 4),'+
      '(5, 1),'+
      '(5, 3);',

      (err) => {
        if (err) {
          throw err;
        }
        console.log('Successfully inserted sample data to the database');
        connection.end();
      }
    );
  });
}
