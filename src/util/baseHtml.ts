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
        font-family: sans-serif;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid black;
      }

      th,
      td {
        border-left: 1px solid #999;
        border-top: 1px solid black;
        padding: 5px;
        text-align: left;
      }

      th:first-child, td:first-child {
        border-left: inherit;
      }

      th {
        background-color: #f2f2f2;
      }

      td.ok {
        background-color: #bfb;
        text-align: center;
      }
      
      td.warning {
        background-color: #f1f19f;
      }

      td.alert {
        background-color: #ff8888;
      }

      td.not-evaluated {
        background-color: #c0c0c0;
        text-align: center;
      }

      td.not-stopped {
        text-align: center;
      }
    </style>
  </body>
</html>
`;