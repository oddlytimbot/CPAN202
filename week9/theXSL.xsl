<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<breakfast_menu>
<xsl:for-each select="breakfast_menu/food">
    <food>
        <name><xsl:value-of select="name"/></name>
        <price><xsl:value-of select="price"/></price>
        <description><xsl:value-of select="description"/></description>
        <calories><xsl:value-of select="calories"/></calories>
        <copy><xsl:value-of select="copy"/></copy>
    </food>
</xsl:for-each>
</breakfast_menu>
</xsl:template>
</xsl:stylesheet>