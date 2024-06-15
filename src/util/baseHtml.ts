export const baseHtml = (indicators: string, results: string) => `
<html>
  <head>
    <title>Scout Results</title>
  </head>

  <body>
    <h1>Scout Results</h1>
    <table>
      <thead>
        <th>Dependency \\ Indicators</th>
        ${indicators}
      </thead>
      <tbody>
        ${ results }
      </tbody>
    </table>

    <style>
      body {
        padding: 1rem;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        border: 1px solid black;
        padding: 5px;
        text-align: left;
      }

      th {
        background-color: #f2f2f2;
      }

      td.ok {
        background-color: #9ff1b2;
      }
      
      td.warning {
        background-color: #f1f19f;
      }

      td.alert {
        background-color: #ff8888;
      }

      td.not-evaluated {
        background-color: #c0c0c0;
      }
    </style>
  </body>
</html>
`;