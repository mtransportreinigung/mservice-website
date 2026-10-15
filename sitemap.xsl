<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="de">
      <head>
        <title>XML Sitemap | M Transport &amp; Reinigung Service</title>
        <style>
          body { font-family: Arial, Helvetica, sans-serif; background-color: #002266; color: #333; margin: 0; padding: 40px 20px; }
          .container { max-width: 900px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 8px 30px rgba(0,0,0,0.15); border-top: 6px solid #FF6A00; }
          h1 { color: #002266; font-size: 22px; margin-bottom: 8px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
          p { color: #64748b; font-size: 14px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th { background-color: #f8fafc; color: #002266; padding: 12px 15px; text-align: left; font-size: 13px; text-transform: uppercase; border-bottom: 2px solid #cbd5e1; }
          td { padding: 12px 15px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
          tr:hover { background-color: #f1f5f9; }
          a { color: #0051C7; text-decoration: none; font-weight: bold; }
          a:hover { color: #FF6A00; text-decoration: underline; }
          .badge { background: #e0f2fe; color: #0051C7; padding: 4px 10px; border-radius: 50px; font-size: 12px; font-weight: bold; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>XML Sitemap</h1>
          <p>Übersicht aller aktiven Seiten von <strong>M Transport &amp; Reinigung Service</strong>.</p>
          <table>
            <thead>
              <tr>
                <th>URL / Seitenlink</th>
                <th>Priorität</th>
                <th>Änderungsfrequenz</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="s:urlset/s:url">
                <tr>
                  <td>
                    <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                  </td>
                  <td>
                    <span class="badge"><xsl:value-of select="s:priority"/></span>
                  </td>
                  <td>
                    <xsl:value-of select="s:changefreq"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
